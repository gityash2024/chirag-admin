import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import successIcon from '../../assets/check-wallet.png';
import avatarImage from '../../assets/runner-avatar.png';
import rating from '../../assets/rating.png';
import clock from '../../assets/clock.png';
import calendar from '../../assets/calendar-event.png';
import map from '../../assets/map-pin.png';
import { toast } from 'react-toastify';
import { getVendorById, updateVendor, registerVendor, getAllBookingsList, getVendorRunners } from '../../services/commonService';

const Container = styled.div`
  padding: 20px;
  font-family: 'Public Sans';
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  color: #ff0000;
  padding: 5px;
  margin-left: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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
  &::after {
    content: ' *';
    color: red;
  }
`;

const InputField = styled.input`
  padding: 10px;
  width: 100%;
  border: 1px solid #F1F1F1;
  border-radius: 4px;
  font-size: 14px;
  color: #121212;
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
  cursor: pointer;
`;

const SubmitButton = styled.button`
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: center;
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
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
  padding: 20px;
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

const BackButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
  border: 1px solid #E3E6E8;
  border-radius: 4px;
  cursor: pointer;
  color: #121212;
  font-size: 16px;
`;

const BackIcon = styled(FiArrowLeft)`
  margin-right: 8px;
`;

const SuccessBadge = styled.div`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: rgba(40, 199, 111, 0.16);
  color: #28C76F;
  font-size: 12px;
  font-weight: 600;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid #E3E6E8;
  border-radius: 8px;
  overflow: hidden;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px;
  color: #121212;
  font-weight: 600;
  background-color: #F5F6F7;
`;

const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #E3E6E8;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 1px solid #E3E6E8;
  color: #121212;
`;

const ActionIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
  cursor: pointer;
`;

const Vendor = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [droneSpecs, setDroneSpecs] = useState([{}]);
  const [batterySpecs, setBatterySpecs] = useState([{}]);
  const [droneAccordionStates, setDroneAccordionStates] = useState([true]);
  const [batteryAccordionStates, setBatteryAccordionStates] = useState([true]);
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    email: '',
    address1: '',
    address2: '',
    state: '',
    city: '',
    droneLicense: '',
    uinNumber: '',
    experience: '',
    pricing: '',
    serviceState: '',
    serviceCity: '',
    village: '',
    drones: [],
    batteries: []
  });
  const [loading, setLoading] = useState(false);
  const [bookingsList, setBookingsList] = useState([]);
  const [runners, setRunners] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id && (mode === 'view' || mode === 'edit')) {
      fetchVendorDetails();
    }
  }, [id, mode]);

  const fetchVendorDetails = async () => {
    try {
      const response = await getVendorById(id);
      setFormData(response.data);
      setDroneSpecs(response.data.drones || [{}]);
      setBatterySpecs(response.data.batteries || [{}]);
      if (mode === 'view') {
        fetchBookingDetails();
        fetchRunnerDetails();
      }
    } catch (error) {
      toast.error("Failed to fetch vendor details");
      navigate('/manage-vendor');
    }
  };

  const fetchBookingDetails = async () => {
    try {
      setLoading(true);
      const response = await getAllBookingsList();
      const filteredBookings = response.data.filter(b => b?.vendor?._id === id);
      setBookingsList(filteredBookings);
    } catch (error) {
      toast.error('Failed to fetch booking details');
    } finally {
      setLoading(false);
    }
  };

  const fetchRunnerDetails = async () => {
    try {
      const response = await getVendorRunners({ id });
      setRunners(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch runner details');
    }
  };

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

  const removeDroneSpec = (index) => {
    const newDroneSpecs = [...droneSpecs];
    newDroneSpecs.splice(index, 1);
    setDroneSpecs(newDroneSpecs);
    
    const newStates = [...droneAccordionStates];
    newStates.splice(index, 1);
    setDroneAccordionStates(newStates);
    
    const newFormData = { ...formData };
    newFormData.drones.splice(index, 1);
    setFormData(newFormData);
  };

  const removeBatterySpec = (index) => {
    const newBatterySpecs = [...batterySpecs];
    newBatterySpecs.splice(index, 1);
    setBatterySpecs(newBatterySpecs);
    
    const newStates = [...batteryAccordionStates];
    newStates.splice(index, 1);
    setBatteryAccordionStates(newStates);
    
    const newFormData = { ...formData };
    newFormData.batteries.splice(index, 1);
    setFormData(newFormData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleDroneInputChange = (e, index) => {
    const { name, value } = e.target;
    const newSpecs = [...droneSpecs];
    newSpecs[index] = { ...newSpecs[index], [name]: value };
    setDroneSpecs(newSpecs);
    
    const newFormData = { ...formData };
    newFormData.drones = newSpecs;
    setFormData(newFormData);
  };

  const handleBatteryInputChange = (e, index) => {
    const { name, value } = e.target;
    const newSpecs = [...batterySpecs];
    newSpecs[index] = { ...newSpecs[index], [name]: value };
    setBatterySpecs(newSpecs);
    
    const newFormData = { ...formData };
    newFormData.batteries = newSpecs;
    setFormData(newFormData);
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['name', 'mobileNumber', 'email', 'state', 'city', 'droneLicense', 'uinNumber'];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = `${field} is required`;
      }
    });

    if (formData.mobileNumber && !/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Invalid mobile number';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fill all required fields correctly');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        drones: droneSpecs,
        batteries: batterySpecs
      };

      if (mode === 'edit') {
        await updateVendor(id, payload);
        toast.success('Vendor updated successfully');
      } else {
        await registerVendor(payload);
        toast.success('Vendor added successfully');
      }
      navigate('/manage-vendor');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <Title>Vendor Management / {mode === 'edit' ? 'Edit' : mode === 'view' ? 'View' : 'Add'}</Title>
        <BackButton onClick={() => navigate('/manage-vendor')}>
          <BackIcon />
          Back
        </BackButton>
      </Header>

      <Form onSubmit={handleSubmit}>
        <FormRow>
          <InputGroup>
            <InputLabel>Name</InputLabel>
            <InputField
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Name"
              disabled={mode === 'view'}
              style={{ borderColor: errors.name ? 'red' : '#F1F1F1' }}
            />
            {errors.name && <span style={{ color: 'red', fontSize: '12px' }}>{errors.name}</span>}
          </InputGroup>
          <InputGroup>
            <InputLabel>Mobile Number</InputLabel>
            <InputField
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              placeholder="Enter Mobile Number"
              disabled={mode === 'view'}
              style={{ borderColor: errors.mobileNumber ? 'red' : '#F1F1F1' }}
            />
            {errors.mobileNumber && <span style={{ color: 'red', fontSize: '12px' }}>{errors.mobileNumber}</span>}
          </InputGroup>
          <InputGroup>
            <InputLabel>Email ID</InputLabel>
            <InputField
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter Email ID"
              disabled={mode === 'view'}
              style={{ borderColor: errors.email ? 'red' : '#F1F1F1' }}
            />
            {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email}</span>}
          </InputGroup>
        </FormRow>
        <FormRow>
          <InputGroup>
            <InputLabel>State</InputLabel>
            <InputField
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="Enter State"
              disabled={mode === 'view'}
              style={{ borderColor: errors.state ? 'red' : '#F1F1F1' }}
            />
            {errors.state && <span style={{ color: 'red', fontSize: '12px' }}>{errors.state}</span>}
          </InputGroup>
          <InputGroup>
            <InputLabel>City</InputLabel>
            <InputField
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Enter City"
              disabled={mode === 'view'}
              style={{ borderColor: errors.city ? 'red' : '#F1F1F1' }}
            />
            {errors.city && <span style={{ color: 'red', fontSize: '12px' }}>{errors.city}</span>}
          </InputGroup>
          <InputGroup>
            <InputLabel>Region</InputLabel>
            <InputField
              name="region"
              value={formData.region}
              onChange={handleInputChange}
              placeholder="Enter Region"
              disabled={mode === 'view'}
            />
          </InputGroup>
        </FormRow>

        <FormRow>
          <InputGroup>
            <InputLabel>UIN Number</InputLabel>
            <InputField
              name="uinNumber"
              value={formData.uinNumber}
              onChange={handleInputChange}
              placeholder="Enter UIN Number"
              disabled={mode === 'view'}
              style={{ borderColor: errors.uinNumber ? 'red' : '#F1F1F1' }}
            />
            {errors.uinNumber && <span style={{ color: 'red', fontSize: '12px' }}>{errors.uinNumber}</span>}
          </InputGroup>
          <InputGroup>
            <InputLabel>Drone Pilot License</InputLabel>
            <InputField
              name="droneLicense"
              value={formData.droneLicense}
              onChange={handleInputChange}
              placeholder="Enter Drone Pilot License"
              disabled={mode === 'view'}
              style={{ borderColor: errors.droneLicense ? 'red' : '#F1F1F1' }}
            />
            {errors.droneLicense && <span style={{ color: 'red', fontSize: '12px' }}>{errors.droneLicense}</span>}
          </InputGroup>
          <InputGroup>
            <InputLabel>Experience in Years</InputLabel>
            <InputField
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              placeholder="Enter Experience in Years"
              type="number"
              disabled={mode === 'view'}
            />
          </InputGroup>
        </FormRow>

        <FormRow>
          <InputGroup>
            <InputLabel>Pricing for 1 acre</InputLabel>
            <InputField
              name="pricing"
              value={formData.pricing}
              onChange={handleInputChange}
              placeholder="Enter Pricing"
              type="number"
              disabled={mode === 'view'}
            />
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

        {droneSpecs.map((spec, index) => (
          <AccordionWrapper key={`drone-${index}`}>
            <AccordionHeader onClick={() => toggleDroneAccordion(index)}>
              <span>Drone Specification {index + 1}</span>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ExpandMoreIcon />
                {mode !== 'view' && droneSpecs.length > 1 && (
                  <DeleteButton
                    onClick={(e) => {
                      e.stopPropagation();
                      removeDroneSpec(index);
                    }}
                  >
                    ×
                  </DeleteButton>
                )}
              </div>
            </AccordionHeader>
            <AccordionContent isOpen={droneAccordionStates[index]}>
              <FormRow>
                <InputGroup>
                  <InputLabel>Drone Model</InputLabel>
                  <InputField
                    name="model"
                    value={spec.model || ''}
                    onChange={(e) => handleDroneInputChange(e, index)}
                    placeholder="Enter Drone Model"
                    disabled={mode === 'view'}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLabel>Speed of Drone</InputLabel>
                  <InputField
                    name="speed"
                    value={spec.speed || ''}
                    onChange={(e) => handleDroneInputChange(e, index)}
                    placeholder="Enter Speed of Drone"
                    disabled={mode === 'view'}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLabel>Flow Rate</InputLabel>
                  <InputField
                    name="flowRate"
                    value={spec.flowRate || ''}
                    onChange={(e) => handleDroneInputChange(e, index)}
                    placeholder="Enter Flow Rate"
                    disabled={mode === 'view'}
                  />
                </InputGroup>
              </FormRow>
              <FormRow>
                <InputGroup>
                  <InputLabel>Payload Capacity</InputLabel>
                  <InputField
                    name="payload"
                    value={spec.payload || ''}
                    onChange={(e) => handleDroneInputChange(e, index)}
                    placeholder="Enter Payload Capacity"
                    disabled={mode === 'view'}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLabel>Manufacturer</InputLabel>
                  <InputField
                    name="manufacturer"
                    value={spec.manufacturer || ''}
                    onChange={(e) => handleDroneInputChange(e, index)}
                    placeholder="Enter Manufacturer Name"
                    disabled={mode === 'view'}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLabel>Purchase Year</InputLabel>
                  <InputField
                    name="purchaseYear"
                    value={spec.purchaseYear || ''}
                    onChange={(e) => handleDroneInputChange(e, index)}
                    placeholder="Enter Purchase Year"
                    disabled={mode === 'view'}
                  />
                </InputGroup>
              </FormRow>
              {mode !== 'view' && (
                <ImageUpload>
                  <ImageBox>+ Add Drone Image</ImageBox>
                </ImageUpload>
              )}
            </AccordionContent>
          </AccordionWrapper>
        ))}

        {mode !== 'view' && (
          <AddMoreWrapper>
            <AddMore onClick={addDroneSpec}>+ Add More Drone</AddMore>
          </AddMoreWrapper>
        )}

        {batterySpecs.map((spec, index) => (
          <AccordionWrapper key={`battery-${index}`}>
            <AccordionHeader onClick={() => toggleBatteryAccordion(index)}>
              <span>Battery Specification {index + 1}</span>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ExpandMoreIcon />
                {mode !== 'view' && batterySpecs.length > 1 && (
                  <DeleteButton
                    onClick={(e) => {
                      e.stopPropagation();
                      removeBatterySpec(index);
                    }}
                  >
                    ×
                  </DeleteButton>
                )}
              </div>
            </AccordionHeader>
            <AccordionContent isOpen={batteryAccordionStates[index]}>
              <FormRow>
                <InputGroup>
                  <InputLabel>Capacity</InputLabel>
                  <InputField
                    name="capacity"
                    value={spec.capacity || ''}
                    onChange={(e) => handleBatteryInputChange(e, index)}
                    placeholder="Enter Capacity"
                    disabled={mode === 'view'}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLabel>Life Cycles</InputLabel>
                  <InputField
                    name="lifeCycles"
                    value={spec.lifeCycles || ''}
                    onChange={(e) => handleBatteryInputChange(e, index)}
                    placeholder="Enter Life Cycles"
                    disabled={mode === 'view'}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLabel>Voltage</InputLabel>
                  <InputField
                    name="voltage"
                    value={spec.voltage || ''}
                    onChange={(e) => handleBatteryInputChange(e, index)}
                    placeholder="Enter Voltage"
                    disabled={mode === 'view'}
                  />
                </InputGroup>
              </FormRow>
              <FormRow>
                <InputGroup>
                  <InputLabel>Ampere</InputLabel>
                  <InputField
                    name="ampere"
                    value={spec.ampere || ''}
                    onChange={(e) => handleBatteryInputChange(e, index)}
                    placeholder="Enter Ampere"
                    disabled={mode === 'view'}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLabel>Manufacturer</InputLabel>
                  <InputField
                    name="manufacturer"
                    value={spec.manufacturer || ''}
                    onChange={(e) => handleBatteryInputChange(e, index)}
                    placeholder="Enter Manufacturer"
                    disabled={mode === 'view'}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLabel>Purchase Year</InputLabel>
                  <InputField
                    name="purchaseYear"
                    value={spec.purchaseYear || ''}
                    onChange={(e) => handleBatteryInputChange(e, index)}
                    placeholder="Enter Purchase Year"
                    disabled={mode === 'view'}
                  />
                </InputGroup>
              </FormRow>
            </AccordionContent>
          </AccordionWrapper>
        ))}

        {mode !== 'view' && (
          <AddMoreWrapper>
            <AddMore onClick={addBatterySpec}>+ Add More Battery</AddMore>
          </AddMoreWrapper>
        )}

        {mode !== 'view' && (
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Processing...' : mode === 'edit' ? 'Update Vendor' : 'Add Vendor'}
          </SubmitButton>
        )}
      </Form>

      {mode === 'view' && (
        <>
          <Header>
            <Title>Booking History</Title>
          </Header>
          <BookingHistoryContainer>
            {bookingsList.length > 0 ? (
              bookingsList.map((booking, index) => (
                <BookingCard key={index}>
                  <BookingHeader>
                    <BookingId>#{booking._id}</BookingId>
                    <StatusBadge status={booking.status}>{booking.status}</StatusBadge>
                  </BookingHeader>
                  <div>
                    <img src={map} alt="Location" style={{ marginRight: '8px' }} />
                    {booking.farmLocation}
                  </div>
                  <div>
                    <img src={calendar} alt="Calendar" style={{ marginRight: '8px' }} />
                    {new Date(booking.date).toLocaleDateString()}
                  </div>
                  <div>
                    <img src={clock} alt="Clock" style={{ marginRight: '8px' }} />
                    {booking.time}
                  </div>
                  <div>Farm Area: {booking.farmArea} acres</div>
                  <div>Farmer: {booking.farmerName}</div>
                  <div>Contact: {booking.contactNumber}</div>
                </BookingCard>
              ))
            ) : (
              <div style={{ textAlign: 'center', gridColumn: '1 / -1' }}>No booking history available</div>
            )}
          </BookingHistoryContainer>

          <Header>
            <Title>Associated Runners</Title>
          </Header>
          <Table>
            <thead>
              <TableRow>
                <TableHeader>Runner Name</TableHeader>
                <TableHeader>Runner Contact</TableHeader>
                <TableHeader>State</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {runners.map((runner, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={avatarImage}
                        alt="Runner"
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          marginRight: '10px'
                        }}
                      />
                      {runner.name}
                    </div>
                  </TableCell>
                  <TableCell>{runner.contact}</TableCell>
                  <TableCell>{runner.state}</TableCell>
                  <TableCell>
                    <ActionIcon src={rating} alt="Rating" />
                    <ActionIcon src={rating} alt="Rating" />
                    <ActionIcon src={rating} alt="Rating" />
                  </TableCell>
                </TableRow>
              ))}
              {runners.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                    No runners associated
                  </TableCell>
                </TableRow>
              )}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default Vendor;