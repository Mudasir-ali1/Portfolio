import { lazy, Suspense } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import ServicesMobile from "./ServicesMobile";

const WhatIDoDesktop = lazy(() => import("./WhatIDo"));

export default function ServicesSection() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <ServicesMobile />;
  }

  return (
    <Suspense fallback={null}>
      <WhatIDoDesktop />
    </Suspense>
  );
}

