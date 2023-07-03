import { Helmet } from "react-helmet-async";
import { useLocation } from 'react-router-dom';
import BeatShot_logo_header from '../images/Beatshot_logo_header.png'

const BeatShotRoot = "https://beatshot.gg"

const SEO = ({ title, type, description, image = BeatShot_logo_header, imageAlt = "BeatShot logo", url=""}) => {
    let location = useLocation();
    url = (url === "") ? BeatShotRoot + location.pathname : BeatShotRoot + url;
  return (
    <Helmet prioritizeSeoTags={true}>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />

      <meta name="twitter:card" content={"summary"} />
      <meta property='og:type' content={type}/>

      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />

      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
      <meta name="twitter:url" content={url} />

      <meta property="og:image" content={image} />
      <meta name="twitter:image" content={image} />

      <meta property="og:image:alt" content={imageAlt} />
      <meta property="twitter:image:alt" content={imageAlt} />


    </Helmet>
  );
}
export default SEO;