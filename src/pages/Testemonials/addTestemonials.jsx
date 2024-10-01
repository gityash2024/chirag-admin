import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { addTestemonial, uploadTos3, getTestemonials, editFarmer } from '../../services/commonService';
import { toast } from 'react-toastify';
import Loader from '../../components/loader';

const Container = styled.div`
  padding: 20px;
  font-family: 'Public Sans';
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ImageUploadArea = styled.div`
  display: flex;
  gap: 20px;
`;

const ImageUploadBox = styled.label`
  width: 100px;
  height: 100px;
  border: 2px dashed #E3E6E8;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: center;
`;

const Label = styled.label`
  font-size: 14px;
  color: #121212;
  margin-bottom: 5px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  .input-wrapper {
    width: 100%;

    @media (min-width: 768px) {
      width: 50%;
    }

    display: flex;
    flex-direction: column;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  padding-right: 80px;
  border: 1px solid #E3E6E8;
  border-radius: 4px;
`;

const AddTestimonial = () => {
  const [farmerName, setFarmerName] = useState('');
  const [rating, setRating] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [existingFileUrl, setExistingFileUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchTestimonial();
    }
  }, [id]);

  const fetchTestimonial = async () => {
    setIsLoading(true);
    try {
      const response = await getTestemonials();
      const testimonial = response.data.find(t => t._id === id);
      if (testimonial) {
        setFarmerName(testimonial.farmerName);
        setRating(testimonial.rating.toString());
        setExistingFileUrl(testimonial.testimonialUrl);
        setFileName(testimonial.testimonialUrl.split('/').pop());
      }
    } catch (error) {
      toast.error('Failed to fetch testimonial');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!farmerName || !rating || (!file && !existingFileUrl)) {
      toast.error('Please fill all fields and upload a file');
      return;
    }

    setIsLoading(true);
    try {
      let fileUrl = existingFileUrl;
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const uploadResponse = await uploadTos3({file: formData});
        fileUrl = uploadResponse.data.fileUrl;
      }

      const testimonialData = {
        farmerName,
        rating: Number(rating),
        testimonialUrl: fileUrl
      };

      console.log('Submitting data:', testimonialData);

      if (id) {
        await editFarmer(id, testimonialData);
        toast.success('Testimonial updated successfully');
      } else {
        await addTestemonial(testimonialData);
        toast.success('Testimonial added successfully');
      }
      navigate('/testemonials');
    } catch (error) {
      console.error('Error:', error);
      toast.error(id ? 'Failed to update testimonial' : 'Failed to add testimonial');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <Header>
        <Title>Testimonial Management / {id ? 'Edit' : 'Add'}</Title>
        <BackButton onClick={() => navigate('/testemonials')}>
          <BackIcon />
          Back
        </BackButton>
      </Header>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <div className="input-wrapper">
            <Label>Farmer Name</Label>
            <InputWrapper>
              <Input
                type="text"
                placeholder="Enter farmer name"
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
              />
            </InputWrapper>
          </div>
        </InputGroup>
        <InputGroup>
          <div className="input-wrapper">
            <Label>Rating</Label>
            <InputWrapper>
              <Input
                type="number"
                placeholder="Enter rating (1-5)"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </InputWrapper>
          </div>
        </InputGroup>
        <ImageUploadArea>
          <ImageUploadBox>
            +
            <HiddenFileInput type="file" onChange={handleFileChange} accept="image/*,video/*,audio/*" />
          </ImageUploadBox>
          {fileName && <span>{fileName}</span>}
        </ImageUploadArea>
        <SaveButton type="submit">{id ? 'Update' : 'Save'}</SaveButton>
      </Form>
    </Container>
  );
};

export default AddTestimonial;