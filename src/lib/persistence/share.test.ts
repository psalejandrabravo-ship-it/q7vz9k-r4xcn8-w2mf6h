import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  buildAulaUrl,
  decodeClassroomShare,
  encodeClassroomShare,
  parseAulaHash,
  shareFromCustomize,
  type ClassroomShare,
} from "./share.ts";

const sample: ClassroomShare = {
  v: 2,
  name: "Sala azul",
  schoolName: "Jardín Los Alerces",
  courseName: "Medio mayor",
  teacherName: "Alejandra",
  sessionDate: "2026-09-22",
  logoMode: "hidden",
  logoIncluded: true,
  logoDataUrl: null,
};

describe("classroom share encoding", () => {
  it("round-trips a classroom payload", () => {
    const token = encodeClassroomShare(sample);
    assert.match(token, /^2\./);
    assert.deepEqual(decodeClassroomShare(token), sample);
  });

  it("parses an #aula= hash", () => {
    const hash = `#aula=${encodeClassroomShare(sample)}`;
    assert.deepEqual(parseAulaHash(hash), sample);
  });

  it("keeps a custom logo inside the hash", () => {
    const logo = "data:image/jpeg;base64,abc";
    const share: ClassroomShare = { ...sample, logoMode: "custom", logoDataUrl: logo };
    assert.equal(decodeClassroomShare(encodeClassroomShare(share))?.logoDataUrl, logo);
  });

  it("rejects empty or unknown payloads", () => {
    assert.equal(decodeClassroomShare(""), null);
    assert.equal(decodeClassroomShare("9.abc"), null);
    assert.equal(parseAulaHash("#otra=cosa"), null);
    assert.equal(parseAulaHash(""), null);
  });

  it("still reads links from before logo sharing", () => {
    const json = JSON.stringify({
      v: 1,
      name: "Sala azul",
      schoolName: "Jardín",
      courseName: "Medio",
      teacherName: "",
      sessionDate: "2026-09-22",
    });
    const token = `1.${Buffer.from(json).toString("base64url")}`;
    const decoded = decodeClassroomShare(token);
    assert.equal(decoded?.logoIncluded, false);
    assert.equal(decoded?.name, "Sala azul");
    assert.equal(decoded?.logoMode, "mirarim");
  });

  it("builds a hash URL without sending data as a query string", () => {
    const url = buildAulaUrl("https://juego.vercel.app/", sample);
    assert.equal(url.includes("?"), false);
    assert.ok(url.startsWith("https://juego.vercel.app/#aula="));
    assert.deepEqual(parseAulaHash(new URL(url).hash), sample);
  });

  it("needs a name, course, school, teacher or a custom brand to share", () => {
    assert.equal(
      shareFromCustomize({
        schoolName: "",
        courseName: "",
        teacherName: "",
        logoDataUrl: null,
        logoMode: "mirarim",
        sessionDate: "2026-09-22",
      }),
      null,
    );
    const share = shareFromCustomize(
      {
        schoolName: "Jardín Los Alerces",
        courseName: "",
        teacherName: "",
        logoDataUrl: "data:image/png;base64,aaa",
        logoMode: "custom",
        sessionDate: "2026-09-22",
      },
      "Sala azul",
      "data:image/jpeg;base64,bbb",
    );
    assert.equal(share?.logoMode, "custom");
    assert.equal(share?.logoDataUrl, "data:image/jpeg;base64,bbb");
    assert.equal(share?.logoIncluded, true);
  });

  it("can share a presentation that only hides the logo", () => {
    const share = shareFromCustomize({
      schoolName: "",
      courseName: "",
      teacherName: "",
      logoDataUrl: null,
      logoMode: "hidden",
      sessionDate: "",
    });
    assert.equal(share?.name, "Aula");
    assert.equal(share?.logoMode, "hidden");
  });
});