// Cascade: unavatar.io → GitHub → ui-avatars (initials)
export function onPhotoError(
  e: { target: EventTarget | null },
  handle: string,
  name: string,
  size = 40
) {
  const img = e.target as HTMLImageElement;
  const cleanHandle = handle.replace("@", "");

  if (!img.dataset.fallback) {
    img.dataset.fallback = "github";
    img.src = `https://github.com/${cleanHandle}.png`;
  } else {
    img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1a1a2e&color=fff&size=${size}`;
  }
}
