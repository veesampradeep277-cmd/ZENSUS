/**
 * ZENSUS DSA — C/C++ Compiler Diagnostic Script
 * -----------------------------------------------
 * Checks whether GCC and G++ are usable end-to-end:
 *   1. Binary existence on disk
 *   2. Version command output
 *   3. Compile a minimal C program and execute it
 *   4. Compile a minimal C++ program and execute it
 *
 * Usage:  npx tsx scripts/diagnose-c-cpp.ts
 */

import fs from "fs";
import os from "os";
import path from "path";
import { execFileSync, spawnSync } from "child_process";

// ── Compiler paths to probe ──────────────────────────────────────────────────
const COMPILERS = {
  gcc: [
    "C:\\msys64\\ucrt64\\bin\\gcc.exe",
    "C:\\msys64\\mingw64\\bin\\gcc.exe",
    "C:\\msys64\\usr\\bin\\gcc.exe",
    "gcc", // PATH fallback
  ],
  gpp: [
    "C:\\msys64\\ucrt64\\bin\\g++.exe",
    "C:\\msys64\\mingw64\\bin\\g++.exe",
    "C:\\msys64\\usr\\bin\\g++.exe",
    "g++", // PATH fallback
  ],
};

// ── Minimal source programs ──────────────────────────────────────────────────
const C_SRC = `#include <stdio.h>
int main(void) {
    printf("ZENSUS C works!\\n");
    return 0;
}
`;

const CPP_SRC = `#include <iostream>
int main() {
    std::cout << "ZENSUS C++ works!" << std::endl;
    return 0;
}
`;

// ── Helpers ──────────────────────────────────────────────────────────────────
const HR = "─".repeat(64);
const SEP = "═".repeat(64);

function banner(title: string) {
  console.log(`\n${SEP}`);
  console.log(`  ${title}`);
  console.log(`${SEP}`);
}

function section(title: string) {
  console.log(`\n${HR}`);
  console.log(`  ${title}`);
  console.log(`${HR}`);
}

function ok(msg: string) {
  console.log(`  ✅  ${msg}`);
}

function fail(msg: string) {
  console.log(`  ❌  ${msg}`);
}

function info(msg: string) {
  console.log(`  ℹ️   ${msg}`);
}

function findCompiler(candidates: string[]): string | null {
  for (const candidate of candidates) {
    // Absolute path — check disk
    if (candidate.includes("\\") || candidate.includes("/")) {
      if (fs.existsSync(candidate)) return candidate;
    } else {
      // PATH entry — try running it
      try {
        const r = spawnSync(candidate, ["--version"], { timeout: 5000 });
        if (r.status === 0) return candidate;
      } catch {
        // not found in PATH
      }
    }
  }
  return null;
}

function runVersion(exe: string): { ok: boolean; output: string; error: string } {
  const r = spawnSync(exe, ["--version"], {
    timeout: 8000,
    encoding: "utf8",
    windowsHide: true,
  });
  return {
    ok: r.status === 0,
    output: (r.stdout ?? "").trim(),
    error: (r.stderr ?? r.error?.message ?? "").trim(),
  };
}

function compile(
  exe: string,
  srcFile: string,
  outFile: string,
  extraFlags: string[] = []
): { ok: boolean; stdout: string; stderr: string; status: number | null; spawnError?: string } {
  const r = spawnSync(exe, [...extraFlags, "-o", outFile, srcFile], {
    timeout: 30_000,
    encoding: "utf8",
    windowsHide: true,
    stdio: ["pipe", "pipe", "pipe"],
  });
  return {
    ok: r.status === 0,
    stdout: (r.stdout ?? "").trim(),
    stderr: (r.stderr ?? "").trim(),
    status: r.status,
    spawnError: r.error ? `${r.error.message}` : undefined,
  };
}

function execute(binFile: string): {
  ok: boolean;
  stdout: string;
  stderr: string;
  status: number | null;
} {
  const r = spawnSync(binFile, [], {
    timeout: 10_000,
    encoding: "utf8",
    windowsHide: true,
  });
  return {
    ok: r.status === 0,
    stdout: (r.stdout ?? "").trim(),
    stderr: (r.stderr ?? r.error?.message ?? "").trim(),
    status: r.status,
  };
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  banner("ZENSUS — C / C++ COMPILER DIAGNOSTIC");

  // ──────────────────────────────────────────────────────────────────────────
  // KEY FIX: Inject MSYS2 ucrt64\bin into PATH so GCC's sub-tools
  // (cc1.exe, as.exe, ld.exe) can find their DLLs at runtime.
  // Without this, gcc.exe launches cc1.exe which immediately dies (exit 1)
  // with no error message because libstdc++-6.dll / ucrt.dll cannot be found.
  // ──────────────────────────────────────────────────────────────────────────
  const MSYS2_BIN = "C:\\msys64\\ucrt64\\bin";
  const MSYS2_BIN_ALT = "C:\\msys64\\mingw64\\bin";
  const originalPATH = process.env.PATH ?? "";
  const pathAlreadyHasMsys2 =
    originalPATH.toLowerCase().includes("msys64");

  if (!pathAlreadyHasMsys2) {
    const inject = [MSYS2_BIN, MSYS2_BIN_ALT].filter(fs.existsSync).join(path.delimiter);
    process.env.PATH = inject + path.delimiter + originalPATH;
    info(`PATH injection: prepended ${inject}`);
  } else {
    info(`PATH already contains msys64 — no injection needed`);
  }

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "zensus-diag-"));
  info(`Temp directory: ${tmpDir}`);

  try {
    // ── STAGE 1: Binary existence ────────────────────────────────────────────
    section("STAGE 1 — Compiler binary discovery");

    const gccExe = findCompiler(COMPILERS.gcc);
    const gppExe = findCompiler(COMPILERS.gpp);

    if (gccExe) ok(`gcc found → ${gccExe}`);
    else fail(`gcc NOT found in any of: ${COMPILERS.gcc.join(", ")}`);

    if (gppExe) ok(`g++ found → ${gppExe}`);
    else fail(`g++ NOT found in any of: ${COMPILERS.gpp.join(", ")}`);

    // ── STAGE 2: Version commands ────────────────────────────────────────────
    section("STAGE 2 — Version command output");

    if (gccExe) {
      const v = runVersion(gccExe);
      if (v.ok) ok(`gcc --version:\n${v.output.split("\n")[0]}`);
      else fail(`gcc --version failed:\n  stderr: ${v.error}`);
    } else {
      info("Skipping gcc version (not found)");
    }

    if (gppExe) {
      const v = runVersion(gppExe);
      if (v.ok) ok(`g++ --version:\n${v.output.split("\n")[0]}`);
      else fail(`g++ --version failed:\n  stderr: ${v.error}`);
    } else {
      info("Skipping g++ version (not found)");
    }

    // ── STAGE 3: Compile C ───────────────────────────────────────────────────
    section("STAGE 3 — Compile minimal C program");

    const cSrc = path.join(tmpDir, "hello.c");
    const cBin = path.join(tmpDir, "hello_c.exe");
    fs.writeFileSync(cSrc, C_SRC, "utf8");
    info(`Source written: ${cSrc}`);
    info(`Source content:\n${C_SRC}`);

    let cCompileOk = false;
    if (gccExe) {
      const r = compile(gccExe, cSrc, cBin);
      if (r.ok) {
        ok(`Compilation succeeded (exit ${r.status})`);
        cCompileOk = true;
      } else {
        fail(`Compilation FAILED (exit ${r.status})`);
        if (r.spawnError) console.log(`     spawn error: ${r.spawnError}`);
        if (r.stdout) console.log(`     stdout:\n${r.stdout}`);
        if (r.stderr) console.log(`     stderr:\n${r.stderr}`);
        if (!r.stdout && !r.stderr && !r.spawnError)
          console.log(`     (no output captured — compiler may have crashed silently)`);
      }
    } else {
      fail("Skipping — gcc not found");
    }

    // ── STAGE 4: Execute C binary ────────────────────────────────────────────
    section("STAGE 4 — Execute compiled C binary");

    if (cCompileOk) {
      info(`Binary path: ${cBin}`);
      info(`Binary exists: ${fs.existsSync(cBin)}`);
      const r = execute(cBin);
      if (r.ok && r.stdout === "ZENSUS C works!") {
        ok(`Execution succeeded. Output: "${r.stdout}"`);
      } else {
        fail(`Execution FAILED (exit ${r.status})`);
        console.log(`     stdout: "${r.stdout}"`);
        console.log(`     stderr: "${r.stderr}"`);
      }
    } else {
      info("Skipping execution — compilation failed or compiler missing");
    }

    // ── STAGE 5: Compile C++ ─────────────────────────────────────────────────
    section("STAGE 5 — Compile minimal C++ program");

    const cppSrc = path.join(tmpDir, "hello.cpp");
    const cppBin = path.join(tmpDir, "hello_cpp.exe");
    fs.writeFileSync(cppSrc, CPP_SRC, "utf8");
    info(`Source written: ${cppSrc}`);
    info(`Source content:\n${CPP_SRC}`);

    let cppCompileOk = false;
    if (gppExe) {
      const r = compile(gppExe, cppSrc, cppBin);
      if (r.ok) {
        ok(`Compilation succeeded (exit ${r.status})`);
        cppCompileOk = true;
      } else {
        fail(`Compilation FAILED (exit ${r.status})`);
        if (r.spawnError) console.log(`     spawn error: ${r.spawnError}`);
        if (r.stdout) console.log(`     stdout:\n${r.stdout}`);
        if (r.stderr) console.log(`     stderr:\n${r.stderr}`);
        if (!r.stdout && !r.stderr && !r.spawnError)
          console.log(`     (no output captured — compiler may have crashed silently)`);
      }
    } else {
      fail("Skipping — g++ not found");
    }

    // ── STAGE 6: Execute C++ binary ──────────────────────────────────────────
    section("STAGE 6 — Execute compiled C++ binary");

    if (cppCompileOk) {
      info(`Binary path: ${cppBin}`);
      info(`Binary exists: ${fs.existsSync(cppBin)}`);
      const r = execute(cppBin);
      if (r.ok && r.stdout === "ZENSUS C++ works!") {
        ok(`Execution succeeded. Output: "${r.stdout}"`);
      } else {
        fail(`Execution FAILED (exit ${r.status})`);
        console.log(`     stdout: "${r.stdout}"`);
        console.log(`     stderr: "${r.stderr}"`);
      }
    } else {
      info("Skipping execution — compilation failed or compiler missing");
    }

    // ── STAGE 7: Extra environment info ─────────────────────────────────────
    section("STAGE 7 — Environment information");
    info(`Platform:  ${os.platform()} ${os.arch()}`);
    info(`Node.js:   ${process.version}`);
    info(`OS release: ${os.release()}`);
    // Extra: try running gcc directly via shell to see what the OS says
    section("STAGE 7b — Raw shell compile test");
    try {
      const rawOut = execFileSync(
        "C:\\msys64\\ucrt64\\bin\\gcc.exe",
        ["-v", "-o", path.join(tmpDir, "test_raw.exe"), path.join(tmpDir, "hello.c")],
        { timeout: 15000, encoding: "utf8", windowsHide: true, stdio: ["pipe","pipe","pipe"] }
      );
      ok(`Raw shell compile stdout: ${rawOut}`);
    } catch (e: any) {
      fail(`Raw shell compile threw: ${e?.message}`);
      if (e?.stdout) console.log(`  stdout: ${e.stdout}`);
      if (e?.stderr) console.log(`  stderr: ${e.stderr}`);
    }

    info(`PATH entries (first 10):`)
    const pathEntries = (process.env.PATH ?? "").split(path.delimiter);
    pathEntries.slice(0, 10).forEach((p) => console.log(`     • ${p}`));
    if (pathEntries.length > 10)
      info(`  ... and ${pathEntries.length - 10} more`);

    // ── Summary ──────────────────────────────────────────────────────────────
    banner("DIAGNOSTIC SUMMARY");

    const rows = [
      ["gcc binary found", gccExe ? "✅ YES" : "❌ NO"],
      ["g++ binary found", gppExe ? "✅ YES" : "❌ NO"],
      [
        "gcc --version works",
        gccExe ? (runVersion(gccExe).ok ? "✅ YES" : "❌ NO") : "⏭  SKIP",
      ],
      [
        "g++ --version works",
        gppExe ? (runVersion(gppExe).ok ? "✅ YES" : "❌ NO") : "⏭  SKIP",
      ],
      ["C compile OK", cCompileOk ? "✅ YES" : "❌ NO"],
      ["C execute OK", cCompileOk ? "✅ YES" : "❌ NO"],
      ["C++ compile OK", cppCompileOk ? "✅ YES" : "❌ NO"],
      ["C++ execute OK", cppCompileOk ? "✅ YES" : "❌ NO"],
    ];

    const colW = 28;
    rows.forEach(([label, status]) => {
      console.log(`  ${label.padEnd(colW)} ${status}`);
    });

    console.log(`\n${SEP}\n`);
  } finally {
    // ── Cleanup ───────────────────────────────────────────────────────────────
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      info(`Temp directory cleaned up: ${tmpDir}`);
    } catch (e) {
      console.warn(`  ⚠️  Cleanup failed: ${e}`);
    }
  }
}

main().catch((e) => {
  console.error("\n💥 Diagnostic script crashed:", e);
  process.exit(1);
});
