import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import viewIcon from "../../assets/view-icon.png";
import editIcon from "../../assets/edit-icon.png";
import deleteIcon from "../../assets/delete-icon.png";
import successIcon from "../../assets/check-wallet.png";
import { getTestemonials, deleteFarmer } from "../../services/commonService";
import { toast } from "react-toastify";
import Loader from "../../components/loader";

const Container = styled.div`
  padding: 20px;
  font-family: "Public Sans";
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

const AddButton = styled(Link)`
  padding: 8px 16px;
  background-color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  color: #000000;
  border: 1px solid #000000;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;

  &::before {
    content: "+";
    font-size: 18px;
  }
`;

const TopControls = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const EntriesDropdown = styled.select`
  padding: 8px;
  margin-right: 20px;
  border: 1px solid #e3e6e8;
  border-radius: 4px;
`;

const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid #e3e6e8;
  border-radius: 4px;
  width: 200px;
  margin-left: auto;
`;

const DateInput = styled.input`
  padding: 8px;
  border: 1px solid #e3e6e8;
  border-radius: 4px;
  margin-left: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid #e3e6e8;
  border-radius: 8px;
  overflow: hidden;
`;

const TableHead = styled.thead`
  background-color: #f9fafc;
`;

const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #e3e6e8;
  }
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px;
  color: #121212;
  font-weight: 600;
`;

const TableCell = styled.td`
  padding: 12px;
  font-size: 14px;
  color: #121212;
`;

const ActionIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
  cursor: pointer;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const PageInfo = styled.span`
  font-size: 14px;
  color: #121212;
`;

const PageButtons = styled.div`
  display: flex;
`;

const PageButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid #e3e6e8;
  background-color: ${(props) => (props.active ? "#000" : "white")};
  color: ${(props) => (props.active ? "white" : "#121212")};
  cursor: pointer;
  border-radius: 4px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
`;

const ModalContent2 = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 350px;
  max-width: 600px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const ModalTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const ModalRow = styled.tr`
  border-bottom: 1px solid #e3e6e8;
`;

const ModalCell = styled.td`
  padding: 12px;
  font-size: 14px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  padding: 12px 42px;
  border-radius: 4px;
  background-color: ${(props) => props.backgroundColor || "white"};
  cursor: pointer;
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
`;

const EmptyStateText = styled.p`
  font-size: 18px;
  color: #121212;
  text-align: center;
`;

const BlockConfirmationModal = ({ onClose, onConfirm }) => (
  <Modal>
    <ModalContent2>
        <h2>Are you sure you want to delete this testimonial?</h2>
      <ModalButtons>
        <ModalButton onClick={onClose}>Cancel</ModalButton>
        <ModalButton
          onClick={onConfirm}
          style={{ backgroundColor: "black", color: "white" }}
        >
          Delete
        </ModalButton>
      </ModalButtons>
    </ModalContent2>
  </Modal>
);

const BlockSuccessModal = ({ onClose }) => (
  <Modal>
    <ModalContent2>
      <div style={{ textAlign: "center" }}>
        <img
          src={successIcon}
          style={{ width: "50px", height: "50px", marginBottom: "20px" }}
          alt="Success"
        />
      </div>
      <h3>Testimonial successfully deleted</h3>
    </ModalContent2>
  </Modal>
);

const Testimonials = () => {
  const [showBlockConfirmation, setShowBlockConfirmation] = useState(false);
  const [showBlockSuccess, setShowBlockSuccess] = useState(false);
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [farmerToBlock, setFarmerToBlock] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    const filtered = testimonials.filter(
      (testimonial) =>
        testimonial.farmerName
          ?.toLowerCase()
          .includes(searchTerm?.toLowerCase()) &&
        (!fromDate || new Date(testimonial.createdAt) >= new Date(fromDate)) &&
        (!toDate || new Date(testimonial.createdAt) <= new Date(toDate))
    );
    setFilteredTestimonials(filtered);
    setCurrentPage(1);
  }, [searchTerm, fromDate, toDate, testimonials]);

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const response = await getTestemonials();
      setTestimonials(response.data);
      setFilteredTestimonials(response.data);
    } catch (error) {
      toast.error("Failed to fetch testimonials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBlockClick = (testimonial) => {
    setFarmerToBlock(testimonial);
    setShowBlockConfirmation(true);
  };

  const handleBlockConfirm = async () => {
    setIsLoading(true);
    try {
      await deleteFarmer(farmerToBlock._id);
      setShowBlockConfirmation(false);

      setShowBlockSuccess(true);
      setTimeout(() => {
      setShowBlockSuccess(false);

      }, 1000);
      fetchTestimonials();
      toast.success("Testimonial deleted successfully");
    } catch (error) {
      toast.error("Failed to delete testimonial");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModals = () => {
    setShowBlockConfirmation(false);
    setShowBlockSuccess(false);
    setFarmerToBlock(null);
  };

  const openModal = (testimonial) => {
    setSelectedTestimonial(testimonial);
  };

  const closeModal = () => {
    setSelectedTestimonial(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTestimonials.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return <Loader />;
  }

  if (testimonials.length === 0) {
    return (
      <EmptyStateContainer>
        <EmptyStateText>No testimonials available.</EmptyStateText>
        <AddButton to="/add-testimonial">Add Testimonial</AddButton>
      </EmptyStateContainer>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Testimonial Management</Title>
        <AddButton to="/add-testimonial">Add Testimonial</AddButton>
      </Header>
      <TopControls>
        <span
          style={{ marginRight: "20px", fontWeight: "400", fontSize: "13px" }}
        >
          Show
        </span>
        <EntriesDropdown
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          <option value={7}>07</option>
          <option value={14}>14</option>
          <option value={21}>21</option>
        </EntriesDropdown>
        <span style={{ fontWeight: "400", fontSize: "13px" }}>Entries</span>
        <SearchInput
          placeholder="Search by farmer name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <DateInput
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          placeholder="From Date"
        />
        <DateInput
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          placeholder="To Date"
        />
       { (searchTerm||fromDate||toDate) ?<button style={{marginLeft:"10px", cursor:"pointer", fontWeight:"400", fontSize:"13px",border:"1px solid #000", padding:"5px", borderRadius:"5px"}} onClick={() =>{setSearchTerm(""); setFromDate(""); setToDate("")}}>Clear</button>:null}
      </TopControls>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Testimonial Url</TableHeader>
            <TableHeader>Farmer name</TableHeader>
            <TableHeader>Rating</TableHeader>
            <TableHeader>Upload date</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {currentItems.map((testimonial) => (
            <TableRow key={testimonial._id}>
              <TableCell>
                <a
                  href={testimonial.testimonialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {testimonial.testimonialUrl}
                </a>
              </TableCell>
              <TableCell>{testimonial.farmerName?.toUpperCase()}</TableCell>
              <TableCell>{testimonial.rating}</TableCell>
              <TableCell>
                {new Date(testimonial.createdAt).toLocaleString()}
              </TableCell>
              <TableCell>
                <ActionIcon
                  src={viewIcon}
                  alt="View"
                  onClick={() => openModal(testimonial)}
                />
                <ActionIcon
                  onClick={() =>
                    navigate(`/add-testimonial/${testimonial._id}`)
                  }
                  src={editIcon}
                  alt="Edit"
                />
                <ActionIcon
                  src={deleteIcon}
                  alt="Delete"
                  onClick={() => handleBlockClick(testimonial)}
                />
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <PageInfo>
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, filteredTestimonials.length)} of{" "}
          {filteredTestimonials.length} entries
        </PageInfo>
        <PageButtons>
          <PageButton
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </PageButton>
          {[
            ...Array(
              Math.ceil(filteredTestimonials.length / itemsPerPage)
            ).keys(),
          ].map((number) => (
            <PageButton
              key={number + 1}
              active={currentPage === number + 1}
              onClick={() => paginate(number + 1)}
            >
              {number + 1}
            </PageButton>
          ))}
          <PageButton
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage ===
              Math.ceil(filteredTestimonials.length / itemsPerPage)
            }
          >
            Next
          </PageButton>
        </PageButtons>
      </Pagination>
      {selectedTestimonial && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Testimonial Details</ModalTitle>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>
            <ModalTable>
              <tbody>
                <ModalRow>
                  <ModalCell>
                    <strong>ID:</strong>
                  </ModalCell>
                  <ModalCell>{selectedTestimonial._id}</ModalCell>
                </ModalRow>
                <ModalRow>
                  <ModalCell>
                    <strong>File:</strong>
                  </ModalCell>
                  <ModalCell>
                    <a
                      href={selectedTestimonial.testimonialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {selectedTestimonial.testimonialUrl}
                    </a>
                  </ModalCell>
                </ModalRow>
                <ModalRow>
                  <ModalCell>
                    <strong>Farmer Name:</strong>
                  </ModalCell>
                  <ModalCell>{selectedTestimonial.farmerName}</ModalCell>
                </ModalRow>
                <ModalRow>
                  <ModalCell>
                    <strong>Rating:</strong>
                  </ModalCell>
                  <ModalCell>{selectedTestimonial.rating}</ModalCell>
                </ModalRow>
                <ModalRow>
                  <ModalCell>
                    <strong>Upload Date:</strong>
                  </ModalCell>
                  <ModalCell>
                    {new Date(selectedTestimonial.createdAt).toLocaleString()}
                  </ModalCell>
                </ModalRow>
              </tbody>
            </ModalTable>
          </ModalContent>
        </Modal>
      )}
      {showBlockConfirmation && (
        <BlockConfirmationModal
          onClose={handleCloseModals}
          onConfirm={handleBlockConfirm}
        />
      )}
      {showBlockSuccess && <BlockSuccessModal onClose={handleCloseModals} />}
    </Container>
  );
};
export default Testimonials;
