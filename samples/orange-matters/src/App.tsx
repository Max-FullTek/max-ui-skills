import { DemoApp } from "@sample-shared/DemoApp";
import { OrangeControlShowcase } from "./OrangeControlShowcase";

export default function App() {
  return <DemoApp brandInitials="OM" exclusiveControlShowcase={<OrangeControlShowcase />} />;
}
