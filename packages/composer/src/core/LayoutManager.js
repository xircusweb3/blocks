import { useMemo } from 'react'
import { useBlock } from "../hooks/provider";
import { StackLayout } from "../layout/StackLayout";
import { AppLayout } from "../layout/AppLayout";
import { AppTabLayout } from "../layout/AppTabLayout";
import { SlideLayout } from "../layout/SlideLayout";

export const LayoutManager = () => {
  const { layout } = useBlock()

  const renderLayout = useMemo(() => {
    switch(layout.variant) {
      case 'StackLayout': return <StackLayout /> // stack
      case 'AppLayout': return <AppLayout /> // dashboard
      case 'AppTabLayout': return <AppTabLayout /> // with tabs
      case 'SlideLayout': return <SlideLayout /> // full width
    }
  }, [layout.variant])
  
  return renderLayout
}