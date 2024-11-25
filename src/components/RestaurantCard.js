import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } =
    resData?.info;
  return (
    <div className="res-card m-4 p-4 w-[260px] h-[425px] bg-slate-300 rounded-xl hover:shadow-slate-600 hover:shadow-lg">
      <img
        className="res-logo pb-2 w-60 h-48 rounded-2xl"
        src={CDN_URL + cloudinaryImageId}
      />
      <h3 className="font-bold font-mono text-lg">{name}</h3>
      <br />
      <h5>{cuisines.join(", ")}</h5>
      <h5>{avgRating}</h5>
      <h5>{costForTwo}</h5>
      <h5>{sla.deliveryTime + " minutes"}</h5>
    </div>
  );
};

export default RestaurantCard;
