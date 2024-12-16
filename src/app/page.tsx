// "use client"
// import axios from "axios"
import Image from "next/image"
import { Layout } from "../components/layout/layout"
// import { UiButton } from "./ui/ui-button"

export default function Home() {
  return (
    <Layout>
      <Image width={466} height={466} src="/image1.png" alt="Image" />
    </Layout>
  )
}
