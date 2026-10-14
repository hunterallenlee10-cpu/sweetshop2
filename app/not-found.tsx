import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui";
import cutouts from "@/data/cutouts.json";

export default function NotFound() {
  return (
    <Container className="grid min-h-[70vh] items-center gap-10 py-16 md:grid-cols-2">
      <div>
        <h1 className="display text-[clamp(3rem,1.6rem+5vw,6rem)]">This one fell off the stick.</h1>
        <p className="mt-5 text-xl text-cocoa-700">We couldn&apos;t find that page. Maybe it moved when we rearranged the case.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/shop" className="btn btn-primary text-lg">
            Browse the shop
          </Link>
          <Link href="/" className="btn btn-outline text-lg text-cocoa-900">
            Back home
          </Link>
        </div>
      </div>
      <Image src={cutouts["candy-apple"].src} alt="" width={cutouts["candy-apple"].width} height={cutouts["candy-apple"].height} className="mx-auto h-auto w-48 rotate-[24deg] md:w-64" />
    </Container>
  );
}
