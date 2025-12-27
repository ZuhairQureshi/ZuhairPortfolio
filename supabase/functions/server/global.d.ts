// Ambient declarations for Deno globals so editor/TS doesn't error in this repo.
// This file is intentionally minimal — runtime still uses real Deno when deployed.

declare const Deno: any;

declare namespace Deno {
  const env: {
    get(key: string): string | undefined;
  };
  function serve(handler: any): void;
}
