interface WaterSectionProps {
  reverse?: boolean;
}

export default function WaterSection({ reverse = false }: WaterSectionProps) {
  return (
    <>
      <section id="water-section">
        <div className="h-[30vh] overflow-hidden relative">
          <video className="object-cover w-screen " autoPlay loop muted>
            <source src={`${
                    import.meta.env.VITE_STATIC_FILE
                  }/Ng6Pc2U3bUieXIiTMzD5Dw_whatsapp_video_2025_02_28_at_11_49_36_am.mp4`} type="video/mp4" />
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
