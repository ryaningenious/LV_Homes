import React from "react";
import {
  AirVent,
  Smartphone,
  Shirt,
  Layers,
  MoveDiagonal2,
  Flame,
  WashingMachine,
  Utensils,
  Briefcase,
  TreePalm,
  WavesLadder,
  Dumbbell,
  ParkingSquare,
  Shield,
  Users,
  Shrub,
  PawPrint,
  Footprints,
  Home,
  Wifi,
  ConciergeBell,
  Wrench,
  Bath,
  LandPlot,
  Volleyball,
  Tv,
  Wine,
  MoveVertical,
  Crosshair,
  Waves,
  Leaf,
} from "lucide-react";

const AMENITY_ICONS: Record<string, JSX.Element> = {
  air_conditioning_heating: <AirVent />,
  smart_home_features: <Smartphone />,
  walkin_closets: <Shirt />,
  hardwood_floors_carpet: <Layers />,
  high_ceilings: <MoveDiagonal2 />,
  fireplace: <Flame />,
  inunit_washer_dryer: <WashingMachine />,
  modern_kitchen: <Utensils />,
  home_office_study_room: <Briefcase />,
  private_balcony_patio: <TreePalm />,
  swimming_pool: <WavesLadder />,
  fitness_center_gym: <Dumbbell />,
  parking: <ParkingSquare />,
  gated_community_247_security: <Shield />,
  clubhouse_event_room: <Users />,
  kids_play_area_park: <Shrub />,
  dog_park_petfriendly_features: <PawPrint />,
  walking_trails_jogging_paths: <Footprints />,
  rooftop_terrace: <Home />,
  bbq_outdoor_seating_area: <Flame />,
  highspeed_internet: <Wifi />,
  conference_rooms: <Users />,
  coworking_spaces: <Briefcase />,
  onsite_cafeteria_or_food_court: <Utensils />,
  ample_parking_underground_or_surface: <ParkingSquare />,
  "247_security_access_control": <Shield />,
  energyefficient_building_features: <Leaf />,
  elevators_accessibility_features: <MoveVertical />,
  business_lounge_waiting_area: <ConciergeBell />,
  onsite_maintenance_management: <Wrench />,
  concierge_services: <ConciergeBell />,
  private_spa_sauna: <Bath />,
  golf_course_access: <LandPlot />,
  tennis_courts: <Volleyball />,
  movie_theater_entertainment_lounge: <Tv />,
  wine_cellar: <Wine />,
  smart_home_automation: <Smartphone />,
  private_elevator_access: <MoveVertical />,
  helipad: <Crosshair />,
  beachfront_waterfront_access: <Waves />,
};

interface AmenitiesProps {
  amenities: string[];
}

const AmenitiesList: React.FC<AmenitiesProps> = ({ amenities }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {amenities.map((amenity) =>
        AMENITY_ICONS[amenity] ? (
          <div
            key={amenity}
            className="flex items-center gap-4 rounded-lg text-gray-600"
          >
            {AMENITY_ICONS[amenity]}
            <span className="capitalize text-sm ">
              {amenity.replace(/_/g, " ")}
            </span>
          </div>
        ) : null
      )}
    </div>
  );
};

export default AmenitiesList;
