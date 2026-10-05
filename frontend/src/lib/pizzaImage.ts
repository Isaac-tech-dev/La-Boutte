import type { ImageSourcePropType } from "react-native";

// Local photos used until a pizza has its own image_url in Supabase.
const FALLBACK_IMAGES: ImageSourcePropType[] = [
  require("../../assets/images/P1.png"),
  require("../../assets/images/P2.png"),
  require("../../assets/images/P3.png"),
  require("../../assets/images/P4.png"),
  require("../../assets/images/P5.png"),
  require("../../assets/images/P6.png"),
];

/**
 * The image to show for a pizza: its own image_url when set, otherwise a local
 * photo picked from its id, so the same pizza shows the same photo on every screen.
 */
export function pizzaImageSource(pizza: { id: string; image_url: string | null }): ImageSourcePropType {
  if (pizza.image_url) return { uri: pizza.image_url };
  let hash = 0;
  for (let i = 0; i < pizza.id.length; i++) hash = (hash * 31 + pizza.id.charCodeAt(i)) >>> 0;
  return FALLBACK_IMAGES[hash % FALLBACK_IMAGES.length];
}
