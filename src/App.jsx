import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import { Testimonials } from "./components/testimonials";
import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import * as Realm from "realm-web";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});
const APP_ID = 'APP_ID_HERE';
const ATLAS_SERVICE = 'mongodb-atlas';
const realmApp = new Realm.App({id: APP_ID});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(async () => {
    const credentials = Realm.Credentials.anonymous();
    await realmApp.logIn(credentials);
    const mongodb = realmApp.currentUser.mongoClient(ATLAS_SERVICE);
    const websitesColl = mongodb.db("web").collection("sites");

    let x = await websitesColl.findOne({"site_id":"demo0"}, {
        "projection": {
            "_id": 1,
            "site_id":1,
            "content":1
        }
    });
    if(x.content){
      console.log("Loading from MongoDB");
      console.log("Site:", x.content);
      setLandingPageData(x.content);
    }else{
      //fallback to local
      setLandingPageData(JsonData);
    }
  }, []);

  return (
    <div>
      <Navigation data={landingPageData.Navigation} />
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <Gallery data={landingPageData.Gallery} />
      <Testimonials data={landingPageData.Testimonials} />
      <Team data={landingPageData.Team} />
      <Contact data={landingPageData.Contact} />
    </div>
  );
};

export default App;
