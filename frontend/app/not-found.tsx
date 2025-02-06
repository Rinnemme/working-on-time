import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-white absolute text-center text-balance h-screen w-screen flex flex-col items-center justify-center top-0 z-0 fade-in">
      <h1 className="text-2xl flex items-center gap-2 font-bold text-wot-rose sm:text-3xl">
        Nothing to see here!
      </h1>
      <div className="mt-6 mb-3 max-w-md">
        It looks like there must be a typo in the URL you're attempting to
        access.
      </div>
      <Link
        className="self-center text-sm px-3 py-1 mb-2 mt-2 text-center bg-wot-white border rounded-full hover:cursor-pointer transition text-wot-rose border-wot-rose hover:text-wot-yellow hover:border-wot-yellow"
        href="/"
      >
        Go Home
      </Link>
    </div>
  );
}
