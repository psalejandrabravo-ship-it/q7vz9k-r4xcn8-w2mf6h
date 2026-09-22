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
  v: 1,
  name: "Sala azul",
  schoolName: "Jardín Los Alerces",
  courseName: "Medio mayor",
  teacherName: "Alejandra",
  sessionDate: "2026-09-22",
};

describe("classroom share encoding", () => {
  it("round-trips a classroom payload", () => {
    const token = encodeClassroomShare(sample);
    assert.match(token, /^1\./);
    assert.deepEqual(decodeClassroomShare(token), sample);
  });

  it("parses an #aula= hash", () => {
    const hash = `#aula=${encodeClassroomShare(sample)}`;
    assert.deepEqual(parseAulaHash(hash), sample);
  });

  it("rejects empty or unknown payloads", () => {
    assert.equal(decodeClassroomShare(""), null);
    assert.equal(decodeClassroomShare("2.abc"), null);
    assert.equal(parseAulaHash("#otra=cosa"), null);
    assert.equal(parseAulaHash(""), null);
  });

  it("builds a hash URL without sending data as a query string", () => {
    const url = buildAulaUrl("https://juego.vercel.app/", sample);
    assert.equal(url.includes("?"), false);
    assert.ok(url.startsWith("https://juego.vercel.app/#aula="));
    assert.deepEqual(parseAulaHash(new URL(url).hash), sample);
  });

  it("needs a name, course, school or teacher to share", () => {
    assert.equal(
      shareFromCustomize({
        schoolName: "",
        courseName: "",
        teacherName: "",
        logoDataUrl: null,
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
        sessionDate: "2026-09-22",
      },
      "Sala azul",
    );
    assert.deepEqual(share, {
      v: 1,
      name: "Sala azul",
      schoolName: "Jardín Los Alerces",
      courseName: "",
      teacherName: "",
      sessionDate: "2026-09-22",
    });
  });
});
