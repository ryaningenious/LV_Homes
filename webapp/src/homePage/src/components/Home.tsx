import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "./Card";
import Footer from "./Footer";
import { Feature, getFeatures } from "../utils/api/featureService";
import { getPartners, Partner } from "../utils/api/partnerService";
import { getMenus, Menu } from "../utils/api/menuService";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 2000,
  draggable: false,
  pauseOnHover: false,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
};
const settingsRtl = {
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 2000,
  draggable: false,
  pauseOnHover: false,
  rtl: true,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
};

const settingsProperties = {
  dots: false,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 1000,
  centerMode: true,
  variableWidth: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export default function Home() {
  const homeRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const navMenuRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const headerTextRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const scrollFeatureRef = useRef<HTMLDivElement>(null);
  const triggerFeatureRef = useRef<HTMLDivElement>(null);

  const fetchData = async () => {
    try {
      const responseFeatures = await getFeatures();
      setFeatures(responseFeatures);
      const response = await getPartners();
      setPartners(response);

      const responseMenu = await getMenus();
      setMenus(responseMenu);
    } catch (e) {
      console.error("Error fetching data:", e);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });
    lenis.on("scroll", ScrollTrigger.update);
    // Create a RAF loop to update Lenis
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    const featuresContent = gsap.utils.toArray("#features .content");
    if (loading || features.length === 0 || featuresContent.length === 0) return;

    gsap.to(featuresContent, {
      xPercent: -100 * (featuresContent.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: "#features",
        start: "top top",
        // end: "+=3000",
        pin: true,
        scrub: 0.8,
        snap: 1 / (featuresContent.length - 1),
      },
    });
  }, [loading]);

  useGSAP(() => {
    if (loading) return;

    gsap.utils.toArray(".property-card").forEach((card, i) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 500 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.05,
            scrollTrigger: {
              trigger: "#blog-section",
              start: "-50% top",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });
  }, [loading]);

  useGSAP(() => {
    // ScrollTrigger.defaults({
    //   markers: true,
    // });
    if (logoRef.current && heroRef.current) {
      gsap.fromTo(
        logoRef.current,
        {
          y: "-60vh", // Start from the middle of the first div
          scale: 5,
        },
        {
          y: 0, // End at its original position in the navbar
          scale: 1,

          scrollTrigger: {
            trigger: heroRef.current,
            start: "10% top", // Start animation when the top of the logo reaches the bottom of the viewport
            end: "bottom top", // End animation when the top of the logo reaches the top of the viewport
            scrub: true, // Smooth scrubbing effect
          },
        }
      );

      gsap.fromTo(
        "#hero-text",
        {
          scale: 1,
          opacity: 1,
        },
        {
          scale: 0,
          y: 100,
          opacity: 0,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "10% top", // Start animation when the top of the logo reaches the bottom of the viewport
            end: "bottom 50%", // End animation when the top of the logo reaches the top of the viewport
            scrub: true, // Smooth scrubbing effect
          },
        }
      );
    }

    if (navMenuRef.current) {
      gsap.fromTo(
        navMenuRef.current,
        {
          opacity: "0",
          x: 100,
        },
        {
          x: 0,
          opacity: "100", // End at its original position in the navbar
          ease: "Power4.easeOut",
          duration: 1,
          scrollTrigger: {
            trigger: navMenuRef.current,
            start: "-50% top", // Start animation when the top of the logo reaches the bottom of the viewport
            end: "top top", // End animation when the top of the logo reaches the top of the viewport
            scrub: true, // Smooth scrubbing effect
          },
        }
      );

      gsap.utils.toArray(".dark").forEach((el) => {
        gsap.fromTo(
          navMenuRef.current,
          {
            color: "black",
          },
          {
            color: "white",
            scrollTrigger: {
              // @ts-expect-error trigger element
              trigger: el,
              start: "top top", // Start animation when the top of the logo reaches the bottom of the viewport
              end: "bottom bottom", // End animation when the top of the logo reaches the top of the viewport
              scrub: true, // Smooth scrubbing effect
            },
          }
        );
      });

      gsap.utils.toArray(".light").forEach((el) => {
        gsap.fromTo(
          navMenuRef.current,
          {
            color: "white",
          },
          {
            color: "black",
            scrollTrigger: {
              // @ts-expect-error trigger element
              trigger: el,
              start: "top top", // Start animation when the top of the logo reaches the bottom of the viewport
              end: "bottom bottom", // End animation when the top of the logo reaches the top of the viewport
              scrub: true, // Smooth scrubbing effect
            },
          }
        );
      });
    }

    if (headerTextRefs.current) {
      headerTextRefs.current.forEach((element) => {
        if (element) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: element,
                start: "-100% top",
                end: "30% top",
                scrub: 1,
              },
            })
            .to(element, {
              y: "100%",
              duration: 1,
            });
        }
      });
    }

    gsap.to("#sticky-header-img", {
      width: "98vw",
      height: "100vh",
      borderRadius: "0em",
      duration: 1,

      scrollTrigger: {
        trigger: "#sticky-header",
        start: "top top", // Start animation when the top of the logo reaches the bottom of the viewport
        end: "bottom top", // End animation when the top of the logo reaches the top of the viewport
        scrub: true, // Smooth scrubbing effect
      },
    });

    gsap.to("#header", {
      y: 200,
      scrollTrigger: {
        trigger: "#header",
        start: "bottom bottom", // Start animation when the top of the logo reaches the bottom of the viewport
        end: "bottom top", // End animation when the top of the logo reaches the top of the viewport
        scrub: true, // Smooth scrubbing effect
      },
    });

    gsap.to("#header-gradient", {
      autoAlpha: 1,
      ease: "Power3.easeOut",
      scrollTrigger: {
        trigger: "#header",
        start: "bottom bottom", // Start animation when the top of the logo reaches the bottom of the viewport
        end: "bottom top", // End animation when the top of the logo reaches the top of the viewport
        scrub: true, // Smooth scrubbing effect
      },
    });

    gsap.fromTo(
      "#header-text",
      {
        scale: 0.1,
      },
      {
        autoAlpha: 1,
        scale: 1,
        duration: 0.2,
        scrollTrigger: {
          trigger: "#header",
          start: "top top", // Start animation when the top of the logo reaches the bottom of the viewport
          end: "80% bottom", // End animation when the top of the logo reaches the top of the viewport
          scrub: true, // Smooth scrubbing effect
        },
      }
    );

    gsap.fromTo(
      "#water-img",
      {
        y: 0,
      },
      {
        y: -100,
        duration: 1,
        scrollTrigger: {
          trigger: "#water-img",
          start: "-110% top", // Start animation when the top of the logo reaches the bottom of the viewport
          end: "bottom bottom", // End animation when the top of the logo reaches the top of the viewport
          scrub: true, // Smooth scrubbing effect
        },
      }
    );
  }, []);

  return (
    <div>
      <div ref={homeRef} id="GScroll" className="text-center relative">
        <section id="hero-section" className="dark min-h-screen flex flex-col justify-center items-center  w-full">
          <div ref={heroRef} className="container  flex flex-col justify-end items-center h-screen ">
            <div id="hero-text" className=" flex flex-col justify-center items-center  -translate-y-[50%] md:-translate-y-[150%] gap-2 p-4">
              <div className="bg-gradient-to-r from-gold-100 via-gold-200 via-gold-400 via-gold-300 to-gold-100 bg-clip-text text-transparent text-4xl  animate-shining font-montserrat font-bold">
                Luxury Living Redefined
              </div>

              <div className="text-lg ">High-Quality Homes and Apartments Designed for Modern Living</div>
              <div className="  flex items-center justify-center">
                <div className="rielative group">
                  <button className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-gold-200 via-gold-300 to-gold-400 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                    <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                      <div className="relative z-10 flex items-center space-x-2">
                        <span className="transition-all duration-500 group-hover:translate-x-1">Explore</span>
                        <svg
                          className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                          data-slot="icon"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            clipRule="evenodd"
                            d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="min-h-screen flex flex-col justify-start items-center w-full">
          <div className="container px-5 text-xl flex flex-row justify-between items-center w-full sticky top-0 z-999">
            <div className="hidden md:block flex-1 "></div>
            <div className="flex-1  flex justify-center items-center p-[8px]">
              <div ref={logoRef} className="-translate-y-[60vh]">
                <img
                  src={`${import.meta.env.VITE_STATIC_FILE}/Bi7T037PrUaprig4RTNA7A_lv_homes_logo_03.png`}
                  className="  w-[75px] h-[75px]"
                  alt=""
                  sizes="75px"
                  srcSet=""
                />
              </div>
            </div>
            <div ref={navMenuRef} className="hidden md:block flex-1 ">
              <ul className="flex flex-row justify-center items-center gap-3">
                {menus.map((el, index) => (
                  <li key={index}>
                    <a className="hover:text-gold-100" href={el.url}>
                      {el.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <section className=" dark overflow-hidden min-h-[75vh] flex flex-col justify-center items-center w-full">
            <div className="  container  flex flex-col justify-center items-center h-[75vh]">
              <div>
                <div className="  header_text">
                  <div className="  relative overflow-hidden">
                    <div className="  header_text-move" ref={(el) => (headerTextRefs.current[0] = el)}>
                      <div className="  font-thin text-[6em]/20 md:text-[12.08em]/40 font-bold m-0 p-0">TAG 1</div>
                    </div>
                  </div>
                  <div className="  relative overflow-hidden">
                    <div className="  header_text-move" ref={(el) => (headerTextRefs.current[1] = el)}>
                      <div className="  italic font-thin text-[6em]/20 md:text-[12.08em]/40 font-bold m-0 p-0">TAG 2</div>
                    </div>
                  </div>
                  <div className="  relative overflow-hidden">
                    <div className="  header_text-move" ref={(el) => (headerTextRefs.current[2] = el)}>
                      <div className="  font-thin text-[6em]/20 md:text-[12.08em]/40 font-bold m-0 p-0">TAG 3</div>
                    </div>
                  </div>
                  <div className="  relative overflow-hidden">
                    <div className="  header_text-move is--last" ref={(el) => (headerTextRefs.current[3] = el)}>
                      <div className="  font-thin text-[6em]/20 md:text-[12.08em]/40 font-bold m-0 p-0">TAG 4</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section ref={headerRef} id="header" className="min-h-screen flex flex-col justify-start items-center w-full h-[200vh] relative">
            <div id="sticky-header" className=" w-full sticky top-0 h-screen   flex flex-col justify-center items-center overflow-hidden">
              <div
                id="sticky-header-img"
                className=" bg-white w-[20em] h-[20em] rounded-[20em] md:w-[35em] md:h-[35em] md:rounded-[35em] flex justify-center items-center overflow-hidden relative"
              >
                <img
                  src={`${import.meta.env.VITE_STATIC_FILE}/bkNRtckrQkepp6MsciNuTg_background.jpg`}
                  alt=""
                  srcSet=""
                  sizes="100vw"
                  className=" w-screen h-screen object-cover "
                />
                <div id="header-gradient" className="absolute top-0 left-0 bg-linear-to-t from-black to-transparent size-full opacity-0"></div>
              </div>
              <div className="absolute top-0 left-0 size-full flex justify-center items-center p-4 md:p-32 bg-linear-to-t from-black/30 to-transparent">
                <p id="header-text" className=" text-3xl md:text-5xl drop-shadow-lg text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure fugiat nobis voluptatibus quia tempore temporibus{" "}
                </p>
              </div>
            </div>
          </section>
          <section
            id="feature-section"
            className="light min-h-screen flex flex-col justify-start items-center text-dark-charcoal h-[200vh] overflow-hidden w-[99vw]"
            ref={triggerFeatureRef}
          >
            <div id="features" ref={scrollFeatureRef} className="bg-white relative bg-black w-screen flex">
              {features.map((feature, index) => (
                <div key={index} className="content flex-nowrap  min-w-screen container h-screen flex justify-center items-center relative p-16">
                  <div
                    className={`absolute ${
                      index % 2 === 0 ? "top-0 md:bottom-0 left-0 pl-2 pb-6 pt-16  md:pl-8" : "bottom-0 right-0 pr-2 pb-6 pt-16  md:pr-8"
                    } `}
                  >
                    <div className="text-left text-5xl md:text-8xl font-bold text-gold-300/70 z-50 w-[75vw]">{feature.title}</div>
                  </div>
                  <div
                    className={`flex gap-4 flex-col ${
                      index % 2 === 0 ? "flex-col-reverse md:flex-row" : "md:flex-row md:flex-row-reverse"
                    }  justify-center items-center size-full  p-4 md:p-16`}
                  >
                    <div className="w-full text-2xl font-thin ">{feature.description}</div>
                    <div className="w-full">
                      <img
                        src={`${import.meta.env.VITE_STATIC_FILE}/${feature.image}`}
                        alt=""
                        srcSet=""
                        className="h-[50vh] md:h-[75vh] object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section id="water-section" className="dark flex flex-col justify-center items-center w-full">
            <div className="w-full  flex flex-col justify-center items-center h-[50vh] overflow-hidden">
              <div id="water-img">
                <img src={`${import.meta.env.VITE_STATIC_FILE}/NjtovdxMGUiJ8k5Hd8tP7w_water.jpg`} alt="" className="translate-y-16" />
              </div>
            </div>
          </section>

          <section id="partner-section" className="light w-full flex flex-col justify-start items-center text-dark-charcoal">
            <div className="overflow-hidden bg-white w-full flex flex-col justify-start pt-16 md:pt-32  items-center">
              <div className="font-tinos text-5xl md:text-8xl mb-8">Partners</div>
              <div className="pb-16">
                <div className="container">
                  <Slider {...settings} className="w-[95vw]">
                    {partners.map((el, index) => (
                      <div key={index} className="  flex justify-center items-center">
                        <img
                          src={`${import.meta.env.VITE_STATIC_FILE}/${el.logo}`}
                          alt=""
                          srcSet=""
                          className="w-[100px] h-[100px] md:w-[200px] md:h-[200px]"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
                <div className="container">
                  <Slider {...settingsRtl} className="w-[95vw]">
                    {partners.map((el, index) => (
                      <div key={index} className="  flex justify-center items-center">
                        <img
                          src={`${import.meta.env.VITE_STATIC_FILE}/${el.logo}`}
                          alt=""
                          srcSet=""
                          className="w-[100px] h-[100px] md:w-[200px] md:h-[200px]"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </section>
          <section id="blog-section" className="dark overflow-hidden flex flex-col justify-start items-center w-full text-dark-charcoal pt-16 pb-16">
            <div className="container flex flex-col justify-center items-center h-[75vh]">
              <div className="md:text-left bg-clip-text w-full  font-montserrat text-5xl md:text-8xl mb-8 text-transparent bg-gradient-to-r from-gold-100 via-gold-200 via-gold-400 via-gold-300 to-gold-100 bg-clip-text text-transparent text-4xl animate-shining pb-2 ">
                Blogs
              </div>
              <div id="blogs" className="text-white overflow-hidden ">
                <Slider {...settingsProperties} className="w-[95vw]">
                  {partners.map((_el, index) => (
                    <div key={index} className="property-card  p-4 w-[900px] ">
                      <Card title="Title" description="Lorem" />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </section>
          <section className="overflow-hidden flex flex-col justify-start items-center w-full text-dark-charcoal bg-black/40">
            <Footer />
          </section>
        </section>
      </div>
    </div>
  );
}
