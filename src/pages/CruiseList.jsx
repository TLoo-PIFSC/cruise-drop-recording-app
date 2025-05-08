import '../index.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, GridContainer } from '@trussworks/react-uswds';
import { Table } from '@nmfs-radfish/react-radfish';
import { db } from '../utils/index_db';

export default function CruiseListPage() {
  const navigate = useNavigate();

  const handleNavNewCruise = () => {
    navigate(`${import.meta.env.BASE_URL}/cruises/new`);
  };

  const handleRowClick = ({ id }) => {
    navigate(`${import.meta.env.BASE_URL}/cruises/${id}`);
  };

  const downloadList = async (event) => {
    event.preventDefault();
    try {
      const cruises = await db.dropEvents.toArray();
      const csvContent = 'data:text/csv;charset=utf-8,' + cruises.map((e) => Object.values(e).join(',')).join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'cruise_list.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading cruise list:', error);
    }
  };

  const [cruises, setCruises] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const friends = await db.dropEvents.toArray();
        setCruises(friends);
      } catch (error) {
        console.error('Error fetching cruise list:', error);
      }
    })();
  }, []);

  const columns = [
    {
      key: 'cruiseNumber',
      label: 'Cruise Number',
      sortable: true,
    },
    {
      key: 'dropTime',
      label: 'Drop Time',
    },
    {
      key: 'dropLatitude',
      label: 'Drop Latitude',
    },
    {
      key: 'dropLongitude',
      label: 'Drop Longitude',
    },
    {
      key: 'retreiveTime',
      label: 'Retreive Time',
    },
    {
      key: 'retreiveLatitude',
      label: 'Retreive Latitude',
    },
    {
      key: 'retreiveLongitude',
      label: 'Retreive Longitude',
    },
  ];

  return (
    <GridContainer className='usa-section'>
      <Grid row className='flex-justify flex-align-center margin-top-2'>
        <h1 className='app-sec-header'>Cruise List</h1>
        <Button className='margin-right-0 margin-top-1' onClick={handleNavNewCruise}>
          New Cruise
        </Button>
      </Grid>
      <Grid row>
        <Table columns={columns} data={cruises} onRowClick={handleRowClick} className='margin-top-5' bordered striped />
        {/* {!cruises?.length && <p className="width-full text-color-white text-center">No Cruises Recorded!</p>} */}
      </Grid>
      <Button onClick={downloadList}>Download List</Button>
    </GridContainer>
  );
}
