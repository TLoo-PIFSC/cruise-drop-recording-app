import "../index.css";
import React, { useState } from "react";
import { Form, Button, Grid, GridContainer, ButtonGroup } from "@trussworks/react-uswds";
import GoBackButton from "../components/GoBackButton";
import LableAndTextInput from "../components/LableAndTextInput";

export default function CruiseNewPage() {
  // states
  const [gearRecords, setGearRecords] = useState({ dropLatitude: "", dropLongitude: "", dropTime: "", retreiveLatitude: "", retreiveLongitude: "", retreiveTime: "" });
  const [error, setError] = useState("");
  // functions
  function recordLocation(event) {
    event.preventDefault();
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            resolve([lat, lon]); // Resolving with lat and lon
          },
          (error) => {
            reject("Error getting location: " + error.message); // Rejecting with error message
          }
        );
      } else {
        reject("Geolocation is not supported by this browser.");
      }
    });
  }

  function recordTime(event) {
    event.preventDefault();
    return new Date().toTimeString();
  }

  async function recordLocationAndTime(event, drop_retreive) {
    event.preventDefault();
    try {
      const time = recordTime(event);
      const [latitude, longitude] = await recordLocation(event);
      setGearRecords({
        ...gearRecords,
        [`${drop_retreive}Latitude`]: latitude,
        [`${drop_retreive}Longitude`]: longitude,
        [`${drop_retreive}Time`]: time,
      });
    } catch (error) {
      setError(error); // Set the error message

      // Hide the error message after 5 seconds
      setTimeout(() => {
        setError('');
      }, 5000); // 5000ms = 5 seconds
    }
  }

  return (
    <GridContainer>
      <GoBackButton to={'/cruises'} label={'Cruise List'} />
      <h1>Record Gear Information</h1>
      {error && <div>{error}</div>}
      <Form className="maxw-full">
        <Grid className="flex-evenly" row>
          <Grid>
            <Button type="button" className='bg-green' onClick={(e) => recordLocationAndTime(e, 'drop')}>Record Drop Location & Time</Button>
            <LableAndTextInput title="Drop Time" record={gearRecords.dropTime} />
            <LableAndTextInput title="Drop Latitude" record={gearRecords.dropLatitude} />
            <LableAndTextInput title="Drop Longitude" record={gearRecords.dropLongitude} />
          </Grid>
          <Grid>
            <Button type="button" className='bg-green' onClick={(e) => recordLocationAndTime(e, 'retreive')}>Record Retreive Location & Time</Button>
            <LableAndTextInput title="Retreive Time" record={gearRecords.retreiveTime} />
            <LableAndTextInput title="Retreive Latitude" record={gearRecords.retreiveLatitude} />
            <LableAndTextInput title="Retreive Longitude" record={gearRecords.retreiveLongitude} />
          </Grid>
        </Grid>
        <ButtonGroup className="flex-justify-end">
          <Button type="reset" onClick={recordLocation} secondary>Reset</Button>
          <Button type="submit" onClick={recordLocation}>Add Row</Button>
        </ButtonGroup>
      </Form>
    </GridContainer>
  );
};
