import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import LocationOn from '@mui/icons-material/LocationOn';
import CalendarToday from '@mui/icons-material/CalendarToday';
import AccessTime from '@mui/icons-material/AccessTime';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import successIcon from '../../assets/check-wallet.png';
import avatarImage from '../../assets/runner-avatar.png';
import rating from '../../assets/rating.png';
import clock from '../../assets/clock.png';
import calendar from '../../assets/calendar-event.png';
import map from '../../assets/map-pin.png';
import Phone from '@mui/icons-material/Phone';
const Container = styled.div`
  padding: 20px;
  font-family: 'Public Sans' ;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
const BookingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #121212;
  margin-top: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;
`;

const InputGroup = styled.div`
  flex: 1;
`;

const InputLabel = styled.label`
  font-size: 14px;
  color: #121212;
  margin-top: 10px;
  margin-bottom: 10px;
  display: block;
`;

const InputField = styled.input`
  padding: 8px;
  width: 100%;
  border: 1px solid #F1F1F1;
  border-radius: 4px;
`;

const AccordionWrapper = styled.div`
  margin-bottom: 20px;
  border: 2px solid #CCCCCC;
  border-radius: 8px;
`;

const AccordionHeader = styled.div`
  background-color: #F5F6F7;
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AccordionContent = styled.div`
  padding: 20px;
  display: ${props => (props.isOpen ? 'block' : 'none')};
`;

const AddMoreWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddMore = styled.a`
  color: #000;
  text-decoration: underline;
  cursor: pointer;
`;

const ImageUpload = styled.div`
  display: flex;
  gap: 10px;
`;

const ImageBox = styled.div`
  width: 100px;
  height: 100px;
  margin: 10px;
  border: 1px solid #F1F1F1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubmitButton = styled.button`
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: center;
`;

const BookingHistoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
`;

const BookingCard = styled.div`
  border-radius: 8px;
  cursor: pointer;
 box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.06);
  border: 1px solid #E8E8E8;
  padding: 20px; /* Adjust padding as needed */
   display: flex;
  flex-direction: column;
`;

const BookingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const BookingId = styled.span`
  font-weight: 600;
`;

const StatusBadge = styled.span`
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  background-color: ${props => {
    switch (props.status) {
      case 'Confirmed': return '#C6EEFF';
      case 'Completed': return '#B1FF8C';
      case 'Closed': return '#DAB4FF';
      default: return '#E0E0E0';
    }
  }};
`;

const BookingDetails = styled.p`
  font-size: 14px;
  margin: 5px 0;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const PriceSummary = styled.p`
 font-weight: 500;
  margin-top: 10px;
`;

const RunnerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const RunnerAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const RunnerName = styled.span`
  font-weight: 500;
`;


const Th = styled.th`
  background-color: #F5F6F7;
  padding: 10px;
  text-align: left;
  border: 1px solid #F1F1F1;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #F1F1F1;
`;

const StarRating = styled.div`
  color: gold;
`;



const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid #E3E6E8;
  border-radius: 8px;
  overflow: hidden;
`;

const TableHead = styled.thead`
  background-color: #F5F6F7;
`;

const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #E3E6E8;
  }
`;
const SuccessBadge = styled.div`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: rgba(40, 199, 111, 0.16); /* Light green background */
  color: #28C76F; /* Success green color */
  font-size: 12px;
  font-weight: 600;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px;
  color: #121212;
  font-weight: 600;
`;

const TableCell = styled.td`
  padding: 12px;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 1px solid #E3E6E8;
  font-family: 'Montserrat';
  color: #121212;
`;
const VendorCell = styled.div`
  display: flex;
  align-items: center;
`;

const VendorAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #E3E6E8;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  font-weight: 600;
  color: #121212;
`;

const ActionIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
  cursor: pointer;
`;
const Vendor = ({ mode }) => {
  const { id } = useParams();
  const [droneSpecs, setDroneSpecs] = useState([{}]);
  const [batterySpecs, setBatterySpecs] = useState([{}]);
  const [droneAccordionStates, setDroneAccordionStates] = useState([true]);
  const [batteryAccordionStates, setBatteryAccordionStates] = useState([true]);

  const toggleDroneAccordion = index => {
    const newStates = [...droneAccordionStates];
    newStates[index] = !newStates[index];
    setDroneAccordionStates(newStates);
  };

  const toggleBatteryAccordion = index => {
    const newStates = [...batteryAccordionStates];
    newStates[index] = !newStates[index];
    setBatteryAccordionStates(newStates);
  };

  const addDroneSpec = () => {
    setDroneSpecs([...droneSpecs, {}]);
    setDroneAccordionStates([...droneAccordionStates, true]);
  };

  const addBatterySpec = () => {
    setBatterySpecs([...batterySpecs, {}]);
    setBatteryAccordionStates([...batteryAccordionStates, true]);
  };

  const bookings = [
    { id: 'AB123456',cropName: 'Cotton',contactNumber: '1234567890', status: 'Confirmed', address: 'Lorem ipsum dolor sit amet', date: '13 June, 2023', time: '02:00 PM - 04:00 PM', area: '21 Acres', price: '₹ 20,000', runner: 'Runner name' },
    { id: 'AB123457',cropName: 'Wheat',contactNumber: '1234567890', status: 'Completed', address: 'Lorem ipsum dolor sit amet', date: '14 June, 2023', time: '03:00 PM - 05:00 PM', area: '22 Acres', price: '₹ 22,000', runner: 'Runner name' },
    { id: 'AB123458',cropName: 'Rice',contactNumber: '1234567890', status: 'Closed', address: 'Lorem ipsum dolor sit amet', date: '15 June, 2023', time: '04:00 PM - 06:00 PM', area: '23 Acres', price: '₹ 24,000', runner: 'Runner name' },
    { id: 'AB123459',cropName: 'Cotton',contactNumber: '1234567890', status: 'Confirmed', address: 'Lorem ipsum dolor sit amet', date: '16 June, 2023', time: '05:00 PM - 07:00 PM', area: '24 Acres', price: '₹ 26,000', runner: 'Runner name' },
    { id: 'AB123460',cropName: 'Wheat',contactNumber: '1234567890', status: 'Completed', address: 'Lorem ipsum dolor sit amet', date: '17 June, 2023', time: '06:00 PM - 08:00 PM', area: '25 Acres', price: '₹ 28,000', runner: 'Runner name' },
    { id: 'AB123461',cropName: 'Rice',contactNumber: '1234567890', status: 'Closed', address: 'Lorem ipsum dolor sit amet', date: '18 June, 2023', time: '07:00 PM - 09:00 PM', area: '26 Acres', price: '₹ 30,000', runner: 'Runner name' },
  ];

  const runners = [
    { id: 1, name: 'Jacob Jones', contact: '+91 123 456 7890', state: 'Uttar Pradesh' },
    { id: 2, name: 'Darrell Steward', contact: '+91 123 456 7890', state: 'Chattisgarh' },
    { id: 3, name: 'Esther Howard', contact: '+91 123 456 7890', state: 'Madhya Pradesh' },
    { id: 4, name: 'Jane Cooper', contact: '+91 123 456 7890', state: 'Uttar Pradesh' },
    { id: 5, name: 'Arlene McCoy', contact: '+91 123 456 7890', state: 'Madhya Pradesh' },
    { id: 6, name: 'Jane Cooper', contact: '+91 123 456 7890', state: 'Uttar Pradesh' },
    { id: 7, name: 'Jane Cooper', contact: '+91 123 456 7890', state: 'Chattisgarh' },
    { id: 8, name: 'Ralph Edwards', contact: '+91 123 456 7890', state: 'Madhya Pradesh' },
  ];

  return (
    <Container>
      <Header>
        <Title>Vendor Management / {mode === 'edit' ? 'Edit' : mode === 'view' ? 'View' : 'Add'}</Title>
      </Header>
      <Form>
        <FormRow>
          <InputGroup>
            <InputLabel>Name</InputLabel>
            <InputField placeholder='Enter Name' disabled={mode === 'view'} />
          </InputGroup>
          <InputGroup>
            <InputLabel>Mobile Number</InputLabel>
            <InputField placeholder='Enter Mobile Number' disabled={mode === 'view'} />
          </InputGroup>
          <InputGroup>
            <InputLabel>Email ID</InputLabel>
            <InputField placeholder='Enter Email ID' disabled={mode === 'view'} />
          </InputGroup>
        </FormRow>
        <FormRow>
          <InputGroup>
            <InputLabel>State</InputLabel>
            <InputField placeholder='Enter State' disabled={mode === 'view'} />
          </InputGroup>
          <InputGroup>
            <InputLabel>City</InputLabel>
            <InputField placeholder='Enter City' disabled={mode === 'view'} />
          </InputGroup>
          <InputGroup>
            <InputLabel>Region</InputLabel>
            <InputField placeholder='Enter Region' disabled={mode === 'view'} />
          </InputGroup>
        </FormRow>
        <FormRow>
          <InputGroup>
            <InputLabel>UIN Number</InputLabel>
            <InputField placeholder='Enter UIN Number' disabled={mode === 'view'} />
          </InputGroup>
          <InputGroup>
            <InputLabel>Drone Pilot License</InputLabel>
            <InputField placeholder='Enter Drone Pilot License' disabled={mode === 'view'} />
          </InputGroup>
          <InputGroup>
            <InputLabel>Experience in Years</InputLabel>
            <InputField placeholder='Enter Experience in Years' disabled={mode === 'view'} />
          </InputGroup>
        </FormRow>
        <FormRow>
          <InputGroup>
            <InputLabel>Approx Pricing for 1 acre of land service for general crop</InputLabel>
            <InputField placeholder='Enter Approx Pricing for 1 acre of land service for general crop' disabled={mode === 'view'} />
          </InputGroup>
          <InputGroup>
            {mode === 'view' && (
              <>
                <InputLabel>Aadhar Authentication</InputLabel>
                <SuccessBadge>Successful</SuccessBadge>
              </>
            )}
          </InputGroup>
        </FormRow>
       
        {droneSpecs.map((_, index) => (
          <AccordionWrapper key={index}>
            <AccordionHeader onClick={() => toggleDroneAccordion(index)}>
              <span>Drone Specification {index + 1}</span>
              <ExpandMoreIcon />
            </AccordionHeader>
            <AccordionContent isOpen={droneAccordionStates[index]}>
              <FormRow>
                <InputGroup>
                  <InputLabel>Drone Name</InputLabel>
                  <InputField placeholder='Enter Drone Name' disabled={mode === 'view'} />
                </InputGroup>
                <InputGroup>
                  <InputLabel>Speed of Drone</InputLabel>
                  <InputField placeholder='Enter Speed of Drone' disabled={mode === 'view'} />
                </InputGroup>
                <InputGroup>
                  <InputLabel>Flow Rate of Drone</InputLabel>
                  <InputField placeholder='Enter Flow Rate of Drone' disabled={mode === 'view'} />
                </InputGroup>
              </FormRow>
              <FormRow>
                <InputGroup>
                  <InputLabel>Payload Capacity</InputLabel>
                  <InputField placeholder='Enter Payload Capacity' disabled={mode === 'view'} />
                </InputGroup>
                <InputGroup>
                  <InputLabel>Manufacturer Name</InputLabel>
                  <InputField placeholder='Enter Manufacturer Name' disabled={mode === 'view'} />
                </InputGroup>
                <InputGroup>
                  <InputLabel>Year of Purchase</InputLabel>
                  <InputField placeholder='Enter Year of Purchase' disabled={mode === 'view'} />
                </InputGroup>
              </FormRow>
              <FormRow>
                <ImageUpload>
                  <ImageBox>+</ImageBox>
                  <ImageBox>+</ImageBox>
                  <ImageBox>+</ImageBox>
                </ImageUpload>
              </FormRow>
            </AccordionContent>
          </AccordionWrapper>
        ))}
        <AddMoreWrapper>
          <AddMore onClick={addDroneSpec}>+ Add More</AddMore>
        </AddMoreWrapper>
        {batterySpecs.map((_, index) => (
          <AccordionWrapper key={index}>
            <AccordionHeader onClick={() => toggleBatteryAccordion(index)}>
              <span>Battery Specification {index + 1}</span>
              <ExpandMoreIcon />
            </AccordionHeader>
            <AccordionContent isOpen={batteryAccordionStates[index]}>
              <FormRow>
                <InputGroup>
                  <InputLabel>Capacity</InputLabel>
                  <InputField placeholder='Enter Capacity' disabled={mode === 'view'} />
                </InputGroup>
                <InputGroup>
                  <InputLabel>Life Cycle</InputLabel>
                  <InputField placeholder='Enter Life Cycle' disabled={mode === 'view'} />
                </InputGroup>
                <InputGroup>
                  <InputLabel>Voltage</InputLabel>
                  <InputField placeholder='Enter Voltage' disabled={mode === 'view'} />
                </InputGroup>
              </FormRow>
              <FormRow>
                <InputGroup>
                  <InputLabel>Ampere</InputLabel>
                  <InputField placeholder='Enter Ampere' disabled={mode === 'view'} />
                </InputGroup>
                <InputGroup>
                  <InputLabel>Manufacturer Name</InputLabel>
                  <InputField placeholder='Enter Manufacturer Name' disabled={mode === 'view'} />
                </InputGroup>
                <InputGroup>
                  <InputLabel>Year of Purchase</InputLabel>
                  <InputField placeholder='Enter Year of Purchase' disabled={mode === 'view'} />
                </InputGroup>
              </FormRow>
            </AccordionContent>
          </AccordionWrapper>
        ))}
         <AddMoreWrapper>
          <AddMore onClick={addBatterySpec}>+ Add More</AddMore>
        </AddMoreWrapper>
        {mode !== 'view' && <SubmitButton>Done</SubmitButton>}
      </Form>
      {(mode === 'view' || mode === 'edit') && (
        <>
          <Header>
            <Title>Booking History</Title>
          </Header>
          <BookingHistoryContainer>
            {bookings.map(booking => (
              <BookingCard key={booking.id} onClick={() => handleBookingClick(booking)}>
              <BookingHeader>
                <BookingId>#{booking.id}</BookingId>
                <StatusBadge status={booking.status}>{booking.status}</StatusBadge>
              </BookingHeader>
              <BookingDetails><img src={map} alt="Location" />{booking.address}</BookingDetails>
              <BookingDetails><img src={calendar} alt="Calendar" />{booking.date}</BookingDetails>
              <BookingDetails><img src={clock} alt="Clock" />{booking.time}</BookingDetails>
              <BookingRow>
                <BookingDetails>Farm Area: {booking.area}</BookingDetails>
                <BookingDetails>Crop: {booking.cropName}</BookingDetails>
              </BookingRow>
              <PriceSummary>Price Summary: {booking.price}</PriceSummary>
              <RunnerInfo>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <RunnerAvatar src={avatarImage} alt="Runner" />
                  <RunnerName>{booking.runner}</RunnerName>
                </div>
              </RunnerInfo>
            </BookingCard>
            ))}
          </BookingHistoryContainer>
          <Header>
            <Title>Associated Runners</Title>
          </Header>
        
           <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Runner Name</TableHeader>
            <TableHeader>Runner Contact</TableHeader>
            <TableHeader>State</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {runners.map(runner => (
            <TableRow key={runner.id}>
              <TableCell>
                <VendorCell>
                  <VendorAvatar>{runner.name[0]}</VendorAvatar>
                  {runner.name}
                </VendorCell>
              </TableCell>
              <TableCell>{runner.contact}</TableCell>
              <TableCell>{runner.state}</TableCell>
              <TableCell>
              <ActionIcon src={rating} alt="View" />
              <ActionIcon src={rating} alt="View" />
              <ActionIcon src={rating} alt="View" />
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
        </>
      )}
    </Container>
  );
};

export default Vendor;
