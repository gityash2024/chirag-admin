import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiX } from 'react-icons/fi';
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
  align-items: center;
`;

const ImageUploadBox = styled.label`
  width: 100px;
  height: 100px;
  border: 2px dashed #E3E6E8;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
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

const VideoPreview = styled.video`
  max-width: 200px;
  max-height: 200px;
  margin-left: 20px;
`;

const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;

  span {
    font-size: 14px;
    color: #666;
  }
`;
const RemoveButton = styled.button`
  position: absolute;
  top: -10px;
  right: -10px;
  background: #ff4444;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  padding: 0;
  z-index: 1;

  &:hover {
    background: #ff0000;
  }
`;

const FileContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const AddTestimonial = () => {
  const [farmerName, setFarmerName] = useState('');
  const [rating, setRating] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [filePreview, setFilePreview] = useState('');
  const [existingFileUrl, setExistingFileUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showUpload, setShowUpload] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchTestimonial();
    }
  }, [id]);

  useEffect(() => {
    return () => {
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }
    };
  }, [filePreview]);

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
        setShowUpload(false);
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
      if (selectedFile.type.startsWith('video/')) {
        setFile(selectedFile);
        setFileName(selectedFile.name);
        setFilePreview(URL.createObjectURL(selectedFile));
        setShowUpload(false);
      } else {
        toast.error('Please upload a video file');
        e.target.value = null;
      }
    }
  };

  const handleRemoveFile = () => {
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
    }
    setFile(null);
    setFileName('');
    setFilePreview('');
    setExistingFileUrl('');
    setShowUpload(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!farmerName || !rating || (!file && !existingFileUrl)) {
      toast.error('Please fill all fields and upload a video');
      return;
    }

    setIsLoading(true);
    try {
      let fileUrl = existingFileUrl;
      if (file) {
        const formData = new FormData();
        formData.append('file', file, file.name);
        
        const uploadResponse = await uploadTos3(formData);
        if (!uploadResponse.data || !uploadResponse.data.fileUrl) {
          throw new Error('Failed to get file URL from upload response');
        }
        fileUrl = uploadResponse.data.fileUrl;
      }

      const testimonialData = {
        farmerName,
        rating: Number(rating),
        testimonialUrl: fileUrl
      };

      if (id) {
        await editFarmer(id, testimonialData);
        toast.success('Testimonial updated successfully');
      } else {
        await addTestemonial(testimonialData);
        toast.success('Testimonial added successfully');
      }
      navigate('/testemonials');
    } catch (error) {
      console.error('Upload error:', error);
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
          {showUpload && (
            <ImageUploadBox>
              +
              <HiddenFileInput 
                type="file" 
                onChange={handleFileChange} 
                accept="video/mp4,video/x-m4v,video/*"
              />
            </ImageUploadBox>
          )}
          {(fileName || filePreview || existingFileUrl) && (
            <FileContainer>
              <RemoveButton onClick={handleRemoveFile}>
                <FiX size={16} />
              </RemoveButton>
              <FileInfo>
                <span>{fileName}</span>
                {filePreview && (
                  <VideoPreview controls>
                    <source src={filePreview} type="video/mp4" />
                    Your browser does not support the video tag.
                  </VideoPreview>
                )}
                {existingFileUrl && !filePreview && (
                  <VideoPreview controls>
                    <source src={existingFileUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </VideoPreview>
                )}
              </FileInfo>
            </FileContainer>
          )}
        </ImageUploadArea>
        <SaveButton type="submit">{id ? 'Update' : 'Save'}</SaveButton>
      </Form>
    </Container>
  );
};

export default AddTestimonial;