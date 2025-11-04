import type React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import {
  BedDouble,
  Bath,
  Ruler,
  Landmark,
  CalendarHeart,
  Wallet,
  CreditCard,
} from "lucide-react";
import MapLocation from "./Map";
import { useEffect, useState } from "react";
import { getProjectByName, Project } from "../lib/partnerService";
import { LoadingScreen } from "./LoadingScreen";
import JSZip from "jszip";
import AmenitiesList from "./AmenitiesList";
import GalleryCarousel from "./GalleryCarousel";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getData, postData } from "../lib/apiService";

const schema = yup.object().shape({
  title: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  message: yup.string(),
  interest: yup.string(),
});

type FormData = yup.InferType<typeof schema>;

interface Root {
  result: Result;
  error: string;
  success: boolean;
}

interface Result {
  items: Item[];
  totalCount: number;
}

interface Item {
  isBaseLayout: boolean;
  label: string;
  developerName: string;
  isBuiltInTemplate: boolean;
  parentTemplateId: string;
  allowAccessForNewContentTypes: boolean;
  creationTime: string;
  creatorUserId: string;
  lastModifierUserId: string;
  lastModificationTime: string;
  id: string;
}

interface AEDRates {
  date: string;
  aed: Record<string, number>;
}

export default function LuxuryPropertyPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [project, setProject] = useState<Project | null>(null);

  const [images, setImages] = useState<string[]>([]);
  const [webTemplateId, setWebTemplateId] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [rates, setRates] = useState<AEDRates>();
  const [startingPrice, setStartingPrice] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("aed");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const fetchTemplate = async () => {
    const webTemplate = await getData<Root>("/webtemplates?Search=no_template");
    setWebTemplateId(webTemplate.result.items[0].id);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // Replace with your actual API endpoint

      await postData("/contentitems/leads", {
        saveAsDraft: false,
        templateId: webTemplateId,
        content: { ...data, interest: project?.title },
      });
      setSubmitSuccess(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setSubmitError(
        "An error occurred while submitting the form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchCurrencies = async () => {
    try {
      const response = await fetch(
        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/aed.json"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const jsonData: AEDRates = await response.json();
      setRates(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAndExtractZip = async (url: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_STATIC_FILE}/${url}`,
        {
          // mode: "no-cors",
        }
      );

      if (!response.ok) throw new Error("Failed to download ZIP file");

      const blob = await response.blob();
      const zip = new JSZip();
      const zipContent = await zip.loadAsync(blob);
      const imageUrls: string[] = [];

      for (const fileName in zipContent.files) {
        const zipEntry = zipContent.files[fileName];

        if (!zipEntry.dir && fileName.match(/\.(jpg|jpeg|png|gif)$/i)) {
          const imageBlob = await zipEntry.async("blob");
          const imageUrl = URL.createObjectURL(imageBlob);
          imageUrls.push(imageUrl);
        }
      }

      setImages(imageUrls);
    } catch (error) {
      console.error("Error extracting ZIP file:", error);
    }
  };

  const fetchData = async () => {
    try {
      const path = location.pathname.split("/");
      const response = await getProjectByName(path[path.length - 1]);
      setStartingPrice(response?.starting_price_aed ?? 0);
      setProject(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateRate = (cur: string) => {
    setCurrency(cur);
    const rate = rates?.aed[cur];
    setStartingPrice((project?.starting_price_aed ?? 0) * (rate ?? 1));
  };

  useEffect(() => {
    fetchData();
    fetchTemplate();
    fetchCurrencies();
  }, []);

  useEffect(() => {
    if (project?.zip_gallery) {
      fetchAndExtractZip(project?.zip_gallery);
    }
  }, [loading]);

  return loading ? (
    <LoadingScreen />
  ) : (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-screen w-full">
        <img
          src={`${import.meta.env.VITE_STATIC_FILE}/${project?.main_image}`}
          alt="Luxury Property"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-deep-teal to-transparent "></div>
        <div className="absolute inset-0 bg-opacity-40 flex items-center ">
          <div className="container mx-auto  sticky top-0 ">
            <div className="w-full md:w-[50%] rounded-xl px-4 py-8 ">
              <h1 className="text-4xl md:text-7xl font-bold text-white mb-2">
                {project?.title}
              </h1>
              <p className="text-xl text-gray-200 w-full md:w-[90%]">
                {project?.short_description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 " id="main-section">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
          {/* Property Details */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-3xl font-semibold mb-4">Property Overview</h2>
              <p className="text-gray-600 mb-4">{project?.description}</p>
              <div className="col-span-2 flex flex-col my-8">
                <div className="flex items-center gap-8">
                  <div className="text-xl font-semibold">Starting Price</div>
                  <div className="flex items-center justify-end gap-2 text-xl">
                    {project?.starting_price_aed && (
                      <DetailItem
                        icon={<Wallet className="h-5 w-5" />}
                        label={`${startingPrice.toLocaleString()}`}
                      />
                    )}
                    <div className="flex  justify-end items-center flex-row-reverse gap-4">
                      <label
                        htmlFor="currency"
                        className="text-xs text-gray-500"
                      >
                        Change Currency
                      </label>
                      <select
                        name="currency"
                        id="currency"
                        value={currency}
                        onChange={(e) => updateRate(e.target.value)}
                        className="text-xl"
                      >
                        <option value="aed">AED</option>
                        <option value="eur">EUR</option>
                        <option value="gbp">GBP</option>
                        <option value="usd">USD</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project?.bedrooms && (
                  <DetailItem
                    icon={<BedDouble className="h-5 w-5" />}
                    label={`${project.bedrooms} Bedrooms`}
                  />
                )}
                {project?.bathrooms && (
                  <DetailItem
                    icon={<Bath className="h-5 w-5" />}
                    label={`${project.bathrooms} Bathrooms`}
                  />
                )}
                {project?.total_area_size && (
                  <DetailItem
                    icon={<Ruler className="h-5 w-5" />}
                    label={`${project.total_area_size} sq ft`}
                  />
                )}
                {project?.structure && (
                  <DetailItem
                    icon={<Landmark className="h-5 w-5" />}
                    label={`${project.structure}`}
                  />
                )}
                {project?.handover && (
                  <DetailItem
                    icon={<CalendarHeart className="h-5 w-5" />}
                    label={`${project.handover}`}
                  />
                )}
                {/* {project?.starting_price_aed && (
                  <DetailItem
                    icon={<Wallet className="h-5 w-5" />}
                    label={`${project.starting_price_aed.toLocaleString()} AED`}
                  />
                )} */}

                {project?.payment_plan && (
                  <DetailItem
                    icon={<CreditCard className="h-5 w-5" />}
                    label={`${project.payment_plan}`}
                  />
                )}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold mb-4">Amenities</h2>
              <h3 className="text-xl mb-4 text-gray-600">
                Residential Amenities
              </h3>
              <div className="mb-8">
                {project?.residential_property_amenities && (
                  <AmenitiesList
                    amenities={project?.residential_property_amenities}
                  />
                )}
              </div>

              <h3 className="text-xl mb-4 text-gray-600">Exterior Amenities</h3>
              <div className="mb-8">
                {project?.exterior_community_amenities && (
                  <AmenitiesList
                    amenities={project?.exterior_community_amenities}
                  />
                )}
              </div>

              <h3 className="text-xl mb-4 text-gray-600">
                Commercial Amenities
              </h3>
              <div className="mb-8">
                {project?.commercial_property_amenities && (
                  <AmenitiesList
                    amenities={project?.commercial_property_amenities}
                  />
                )}
              </div>

              <h3 className="text-xl mb-4 text-gray-600">Luxury Amenities</h3>
              <div className="mb-8">
                {project?.luxury_highend_amenities && (
                  <AmenitiesList
                    amenities={project?.luxury_highend_amenities}
                  />
                )}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold mb-4">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((_url, i) => (
                  <div key={i}>
                    <GalleryCarousel
                      images={images}
                      initialIndex={i}
                    ></GalleryCarousel>
                  </div>
                ))}
              </div>
            </section>

            <section className="relative">
              <h2 className="text-3xl font-semibold mb-4">Location</h2>
              <div className="z-10">
                <MapLocation
                  title={project?.title}
                  lat={project?.latitude}
                  lng={project?.longitude}
                />
              </div>
            </section>
          </div>

          {/* Sidebar */}
          {/* Request Information Section */}
          <section className=" py-12">
            <div className="container mx-auto px-4 ">
              <h2 className="text-3xl font-semibold mb-8 text-center">
                Request Information
              </h2>

              <div className="max-w-2xl mx-auto">
                <Card>
                  <CardContent className="p-6">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Input
                            placeholder="Your Name"
                            {...register("title")}
                          />
                          {errors.title && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.title.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Input
                            placeholder="Your Email"
                            type="email"
                            {...register("email")}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <Input
                          placeholder="Your Phone"
                          type="tel"
                          {...register("phone")}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                      <Textarea
                        placeholder="Your Message"
                        rows={4}
                        {...register("message")}
                      />
                      {submitError && (
                        <p className="text-red-500 text-sm">{submitError}</p>
                      )}
                      {submitSuccess && (
                        <p className="text-green-500 text-sm">
                          Thank you for your inquiry. We'll get back to you
                          soon!
                        </p>
                      )}
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Request"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function DetailItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center space-x-2 text-gray-600">
      {icon}
      <span>{label}</span>
    </div>
  );
}
