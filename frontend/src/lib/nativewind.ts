// nativewind v4 only turns `className` into styles on React Native's own components.
// Third-party components must be registered here once, or their className is silently ignored.
// Imported for its side effects at the top of App.tsx.
import { cssInterop } from "nativewind";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";

cssInterop(Animatable.View, { className: "style" });
cssInterop(Animatable.Text, { className: "style" });
cssInterop(LinearGradient, { className: "style" });
