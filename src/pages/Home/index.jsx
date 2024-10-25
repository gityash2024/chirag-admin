import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaDownload } from "react-icons/fa";
import waterIcon from "../../assets/water-icon.png";
import pesticideIcon from "../../assets/pesticide-icon.png";
import carbonFootprintIcon from "../../assets/carbon-footprint-icon.png";
import droneSpraying from "../../assets/drone-spraying.png";
import battery from "../../assets/battery-efficiency.png";
import droneroi from "../../assets/drone-roi.png";
import cropyield from "../../assets/crop-yield.png";
import farmer from "../../assets/farmer.png";
import rural from "../../assets/rural.png";
import genderRatio from "../../assets/genderRatio.png";
import geo from "../../assets/geo.png";
import farmerHealth from "../../assets/farmerHealth.png";
import energy_consumption from "../../assets/energy_consumption.png";
import co2 from "../../assets/co2.png";
import totalfarmer from "../../assets/total-farmer.png";
import totalvendor from "../../assets/totalvendor.png";
import totalRunner from "../../assets/totalRunner.png";
import { getAllVendors, getFarmers,getAllRunners } from "../../services/commonService";
import Loader from "../../components/loader";



const HomeContainer = styled.div`
  padding: 20px;
  font-family: "Public Sans" ;
`;

const Section = styled.section`
  margin-bottom: 30px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #121212;
`;

const SelectDropdown = styled.select`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  font-family: "Public Sans" ;
  font-size: 14px;
`;

const EnvironmentalReportContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const ReportCard = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  flex: 1;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 200px;
`;

const ReportIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
`;

const ReportValue = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.color || "#121212"};
  margin-bottom: 5px;
`;

const ReportLabel = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #121212;
  margin-bottom: 5px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-family: "Public Sans" ;
  font-size: 14px;
`;

const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: "Public Sans" ;
  font-size: 14px;

  svg {
    margin-left: 8px;
  }
`;

const Home = () => {
  const [farmers, setFarmers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [runner, setRunner] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchFarmers();
    fetchVendors();
    fetchRunner();
  }, []);

  const fetchRunner = async () => {
    setIsLoading(true);
    try {
      const response = await getAllRunners();
      setRunner(response.data);
    } catch (error) {
      console.error('Error fetching farmers:', error);
    }finally {
      setIsLoading(false);
    }
  };
  const fetchFarmers = async () => {
    setIsLoading(true);
    try {
      const response = await getFarmers();
      setFarmers(response.data);
    } catch (error) {
      console.error('Error fetching farmers:', error);
    }finally {
      setIsLoading(false);
    }
  };
  const fetchVendors = async () => {
    setIsLoading(true);
    try {
      const response = await getAllVendors();
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching farmers:', error);
    }finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <HomeContainer>
      <Section>
        <SectionHeader>
          <SectionTitle>Report</SectionTitle>
          <SelectDropdown>
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Yearly</option>
          </SelectDropdown>
        </SectionHeader>
        <EnvironmentalReportContainer>
          <ReportCard>
            <ReportLabel>Total Farmer</ReportLabel>
            <ReportIcon src={totalfarmer} alt="Water saved" />
            <ReportValue color="#07B27B">{farmers.length}</ReportValue>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Total Vendor</ReportLabel>
            <ReportIcon src={totalvendor} alt="Pesticide usage" />
            <ReportValue color="#FF9A01">{vendors.length}</ReportValue>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Total Runner</ReportLabel>
            <ReportIcon src={totalRunner} alt="Carbon footprint" />
            <ReportValue color="#529DDF">{runner.length}</ReportValue>
          </ReportCard>
         
        </EnvironmentalReportContainer>
      </Section>

      <Section>
      <SectionHeader>
  <SectionTitle>Environmental KPI Report</SectionTitle>
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <SearchContainer>
      <SearchInput type="text" placeholder="Booking ID" />
      <DownloadButton>
        Download KPI Report <FaDownload />
      </DownloadButton>
    </SearchContainer>
    <SelectDropdown>
      <option>Weekly</option>
      <option>Monthly</option>
      <option>Yearly</option>
    </SelectDropdown>
  </div>
</SectionHeader>

        <EnvironmentalReportContainer>
          <ReportCard>
            <ReportLabel>Water saved till now</ReportLabel>
            <ReportIcon src={waterIcon} alt="Water saved" />
            <ReportValue color="#5CB1FF">400</ReportValue>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Pesticide till now</ReportLabel>
            <ReportIcon src={pesticideIcon} alt="Pesticide usage" />
            <ReportValue color="#F1614B">40%</ReportValue>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Carbon footprint</ReportLabel>
            <ReportIcon src={carbonFootprintIcon} alt="Carbon footprint" />
            <ReportValue color="#41B079">40%</ReportValue>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Energy consumption</ReportLabel>
            <ReportIcon src={energy_consumption} alt="Energy consumption" />
            <ReportValue color="#41B079">Reduced by 100</ReportValue> kWh/ha
          </ReportCard>
          <ReportCard>
            <ReportLabel>Total Emission Reduction</ReportLabel>
            <ReportIcon src={co2} alt="Total Emission Reduction" />
            <ReportValue color="#41B079">88,459 kg CO2</ReportValue>
          </ReportCard>
        </EnvironmentalReportContainer>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>Economic KPI Report</SectionTitle>
          <SelectDropdown>
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Yearly</option>
          </SelectDropdown>
        </SectionHeader>
        <EnvironmentalReportContainer>
          <ReportCard>
            <ReportLabel>ROI for Drone spraying</ReportLabel>
            <ReportIcon src={droneSpraying} alt="ROI for Drone spraying" />
            <ReportValue color="#5CB1FF">40%</ReportValue>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Battery efficiency</ReportLabel>
            <ReportIcon src={battery} alt="Battery efficiency" />
            <ReportValue color="#F1614B">8.5</ReportValue> Hours
          </ReportCard>
          <ReportCard>
            <ReportLabel>Drone ROI/ Drone life</ReportLabel>
            <ReportIcon src={droneroi} alt="Drone ROI/ Drone life" />
            <ReportValue color="#41B079">65%</ReportValue>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Crop yield comparison</ReportLabel> 
            <ReportIcon src={cropyield} alt="Crop yield comparison" />
            <ReportValue color="#41B079">40%</ReportValue>Increased
          </ReportCard>
        </EnvironmentalReportContainer>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>Social KPI Report</SectionTitle>
          <SelectDropdown>
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Yearly</option>
          </SelectDropdown>
        </SectionHeader>
        <EnvironmentalReportContainer>
          <ReportCard>
            <ReportLabel>Farmers Impacted</ReportLabel>
            <ReportIcon src={farmer} alt="Farmers Impacted" />
            <ReportValue color="#5CB1FF">12,987</ReportValue>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Rural Entrepreneurs Impacted</ReportLabel>
            <ReportIcon src={rural} alt="Rural Entrepreneurs Impacted" />
            <ReportValue color="#34B987">34,987</ReportValue>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Gender Ratio (Male:Female)</ReportLabel>
            <ReportIcon src={genderRatio} alt="Gender Ratio (Male:Female)" />
            <ReportValue color="#F1614B">8:9</ReportValue>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Geographical Coverage</ReportLabel>
            <ReportIcon src={geo} alt="Geographical Coverage" />
            <ReportValue color="#41B079">789 km²</ReportValue>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Farmer Health score</ReportLabel>
            <ReportIcon src={farmerHealth} alt="Farmer Health score" />
            <ReportValue color="#E85B6F">85</ReportValue>
          </ReportCard>
        </EnvironmentalReportContainer>
      </Section>
    </HomeContainer>
  );
};

export default Home;
