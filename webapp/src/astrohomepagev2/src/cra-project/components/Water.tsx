interface WaterSectionProps {
  reverse?: boolean;
}

export default function WaterSection({ reverse = false }: WaterSectionProps) {
  return (
    <>
      <section id="water-section">
        <div className="h-[30vh] overflow-hidden relative">
          <video className="object-cover w-screen " autoPlay loop muted>
            <source src="/water.mp4" type="video/mp4" />
          </video>
          {reverse ? (
            <div className="size-full absolute top-0 right-0 left-0 bg-gradient-to-b from-white from-[5%] to-transparent to-[90%]"></div>
          ) : (
            <div className="size-full absolute top-0 right-0 left-0 bg-gradient-to-t from-white from-[5%] to-transparent to-[90%]"></div>
          )}
        </div>
      </section>
    </>
  );
}
