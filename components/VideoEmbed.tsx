export default function VideoEmbed({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gold-500/15 bg-vineyard-900">
      <div className="aspect-video w-full">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
}
