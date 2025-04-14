import '../index.css';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Grid, GridContainer, ButtonGroup, TextInput, Label } from '@trussworks/react-uswds';
import GoBackButton from '../components/GoBackButton';
import LableAndTextInput from '../components/LableAndTextInput';
import { db } from '../utils/index_db';

export default function CruiseNewPage() {
  // states
  const [gearRecords, setGearRecords] = useState({
    cruiseNumber: '',
    dropLatitude: '',
    dropLongitude: '',
    dropTime: '',
    retreiveLatitude: '',
    retreiveLongitude: '',
  });
  const [error, setError] = useState('');
  // hooks
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const record = await db.dropEvents.where('id').equals(Number(id)).first();
          setGearRecords(record);
        } catch (error) {
          setError(error.message);
          // Hide the error message after 5 seconds
          setTimeout(() => {
            setError('');
          }, 5000); // 5000ms = 5 seconds
        }
      })();
    }
  }, [id]);

  // functions
  function recordLocation(event) {
    event.preventDefault();
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            resolve([lat, lon]); // Resolving with lat and lon
          },
          (error) => {
            reject('Error getting location: ' + error.message); // Rejecting with error message
          },
        );
      } else {
        reject('Geolocation is not supported by this browser.');
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
      setError(error.message); // Set the error message

      // Hide the error message after 5 seconds
      setTimeout(() => {
        setError('');
      }, 5000); // 5000ms = 5 seconds
    }
  }

  async function submitRecord(event) {
    event.preventDefault();
    try {
      if (!gearRecords.cruiseNumber) {
        throw new Error('Cruise Number is required');
      }
      await db.dropEvents.put(gearRecords);
      setGearRecords({
        cruiseNumber: '',
        dropLatitude: '',
        dropLongitude: '',
        dropTime: '',
        retreiveLatitude: '',
        retreiveLongitude: '',
        retreiveTime: '',
      });
      navigate('/cruises');
    } catch (error) {
      setError(error.message); // Set the error message

      // Hide the error message after 5 seconds
      setTimeout(() => {
        setError('');
      }, 5000); // 5000ms = 5 seconds
    }
  }

  async function deleteRecord(event) {
    event.preventDefault();
    try {
      if (!confirm('Are you sure you want to delete this record? This action cannot be undone.')) {
        return;
      }
      await db.dropEvents.where('id').equals(Number(id)).delete();
      navigate('/cruises');
    } catch (error) {
      setError(error.message); // Set the error message

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
      {error && <div className='text-red'>{error}</div>}
      <Form className='maxw-full'>
        <Label htmlFor='cruiseNumber' className='margin-bottom-0' requiredMarker>
          Cruise Number
        </Label>
        <TextInput
          id='cruiseNumber'
          name='cruiseNumber'
          type='text'
          className='cruise-number-input'
          value={gearRecords.cruiseNumber}
          onChange={(e) => setGearRecords({ ...gearRecords, cruiseNumber: e.target.value })}
          required
        />
        <Grid className='flex-evenly' row>
          <Grid>
            <Button
              type='button'
              className='bg-green'
              onClick={(e) => recordLocationAndTime(e, 'drop')}
              disabled={gearRecords.dropTime}
            >
              Record Drop Location & Time
            </Button>
            <LableAndTextInput title='Drop Time' record={gearRecords.dropTime} />
            <LableAndTextInput title='Drop Latitude' record={gearRecords.dropLatitude} />
            <LableAndTextInput title='Drop Longitude' record={gearRecords.dropLongitude} />
          </Grid>
          <Grid>
            <Button
              type='button'
              className='bg-green'
              onClick={(e) => recordLocationAndTime(e, 'retreive')}
              disabled={gearRecords.retreiveTime}
            >
              Record Retreive Location & Time
            </Button>
            <LableAndTextInput title='Retreive Time' record={gearRecords.retreiveTime} />
            <LableAndTextInput title='Retreive Latitude' record={gearRecords.retreiveLatitude} />
            <LableAndTextInput title='Retreive Longitude' record={gearRecords.retreiveLongitude} />
          </Grid>
        </Grid>
        <ButtonGroup className='flex-justify-end'>
          <Button type='reset' onClick={deleteRecord} secondary disabled={id ? false : true}>
            Delete
          </Button>
          <Button type='submit' onClick={submitRecord}>
            {id ? 'Update Row' : 'Add Row'}
          </Button>
        </ButtonGroup>
      </Form>
    </GridContainer>
  );
}
