/**
 * Safe WebGL capability detection with immediate context release.
 * Prevents WebGL context leaks that exhaust browser context limits (especially on Mesa / software rendering).
 */

let cachedSupport: boolean | null = null;

export const isWebGLAvailable = (): boolean => {
  if (typeof window === "undefined") return false;
  if (cachedSupport !== null) return cachedSupport;

  try {
    const canvas = document.createElement("canvas");
    // Probe WebGL2 first, then WebGL
    const gl = (
      canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext("webgl", { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext("experimental-webgl")
    ) as WebGLRenderingContext | null;

    if (gl) {
      // CRITICAL: Immediately release the probe context so it does not count towards the browser's context limit
      const loseExt = gl.getExtension("WEBGL_lose_context");
      if (loseExt) {
        loseExt.loseContext();
      }
      cachedSupport = true;
      return true;
    }

    cachedSupport = false;
    return false;
  } catch {
    cachedSupport = false;
    return false;
  }
};

/**
 * Reset cached support state in case of runtime changes (e.g. context restored)
 */
export const resetWebGLCache = (): void => {
  cachedSupport = null;
};
