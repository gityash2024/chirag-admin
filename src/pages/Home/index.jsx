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
import { getAllVendors, getFarmers, getAllRunners, getAllBookingsList } from "../../services/commonService";
import Loader from "../../components/loader";
import * as XLSX from 'xlsx';
import { toast } from "react-toastify";

const HomeContainer = styled.div`
  padding: 20px;
  font-family: "Public Sans";
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

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #121212;
  margin-bottom: 20px;
`;

const SelectDropdown = styled.select`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  font-family: "Public Sans";
  font-size: 14px;
  min-width: 150px;
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

const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: "Public Sans";
  font-size: 14px;
  svg {
    margin-left: 8px;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const Home = () => {
  const [farmers, setFarmers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [runners, setRunners] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dateFilter, setDateFilter] = useState("yearly");
  const [environmentalStats, setEnvironmentalStats] = useState({
    waterSaved: 0,
    pesticideReduction: 0,
    carbonFootprint: 0,
    energyConsumption: 0,
    emissionReduction: 0
  });
  const [economicStats, setEconomicStats] = useState({
    roiDroneSpraying: 0,
    batteryEfficiency: 0,
    droneRoi: 0,
    yieldImprovement: 0
  });
  const [socialStats, setSocialStats] = useState({
    farmersImpacted: 0,
    ruralEntrepreneurs: 0,
    genderRatio: "0:0",
    geographicalCoverage: 0,
    farmerHealthScore: 0
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    console.log('Date filter changed:', dateFilter);
    calculateStats();
  }, [bookings, dateFilter]);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [farmersRes, vendorsRes, runnersRes, bookingsRes] = await Promise.all([
        getFarmers(),
        getAllVendors(),
        getAllRunners(),
        getAllBookingsList()
      ]);

      console.log('Fetched data:', {
        farmers: farmersRes.data,
        vendors: vendorsRes.data,
        runners: runnersRes.data,
        bookings: bookingsRes.data
      });

      setFarmers(farmersRes.data);
      setVendors(vendorsRes.data);
      setRunners(runnersRes.data);
      setBookings(bookingsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterBookingsByDate = (bookings) => {
    const now = new Date();
    const filtered = bookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      switch (dateFilter) {
        case 'weekly':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return bookingDate >= weekAgo;
        case 'monthly':
          const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
          return bookingDate >= monthAgo;
        case 'yearly':
          const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
          return bookingDate >= yearAgo;
        default:
          return true;
      }
    });
    console.log('Filtered bookings:', filtered);
    return filtered;
  };

  const calculateStats = () => {
    const completedBookings = filterBookingsByDate(bookings).filter(booking => 
      booking.status === "completed" || booking.status === "closed"
    );
    console.log('Completed bookings for calculation:', completedBookings);

    const calculateEnvironmentalStats = () => {
      const totalWaterSaved = completedBookings.reduce((sum, booking) => sum + (booking.droneWaterUsage || 0), 0);
      const totalPesticide = completedBookings.reduce((sum, booking) => sum + (booking.dronePesticideUsage || 0), 0);
      const totalEmissions = completedBookings.reduce((sum, booking) => sum + (booking.emissionSavedPerHectare || 0), 0);
      const totalEnergy = completedBookings.reduce((sum, booking) => {
        const conventional = booking.conventionalEnergyConsumption || 0;
        const uav = booking.uavEnergyConsumption || 0;
        return sum + (conventional - uav);
      }, 0);

      setEnvironmentalStats({
        waterSaved: totalWaterSaved,
        pesticideReduction: totalPesticide ? (totalPesticide / completedBookings.length) * 100 : 0,
        carbonFootprint: totalEmissions ? (totalEmissions / completedBookings.length) * 100 : 0,
        energyConsumption: totalEnergy,
        emissionReduction: totalEmissions
      });
    };

    const calculateEconomicStats = () => {
      const totalROI = completedBookings.reduce((sum, booking) => {
        const revenue = booking.cropOutputPerAcre || 0;
        const cost = booking.quotePrice || 0;
        return sum + (cost ? ((revenue - cost) / cost) * 100 : 0);
      }, 0);

      const batteryEfficiency = completedBookings.reduce((sum, booking) => {
        const flightHours = parseInt(booking.droneFlightHours || 0);
        const cycles = booking.chargeCycles || 1;
        return sum + (flightHours / cycles);
      }, 0);

      const droneROI = completedBookings.reduce((sum, booking) => {
        const revenue = booking.cropOutputPerAcre || 0;
        const cost = booking.quotePrice || 0;
        const flightHours = parseInt(booking.droneFlightHours || 0);
        return sum + (flightHours ? (revenue - cost) / flightHours : 0);
      }, 0);

      const yieldImprovement = completedBookings.reduce((sum, booking) => {
        const cropOutput = booking.cropOutputPerAcre || 0;
        const avgOutput = 1500;
        return sum + ((cropOutput - avgOutput) / avgOutput) * 100;
      }, 0);

      setEconomicStats({
        roiDroneSpraying: completedBookings.length ? totalROI / completedBookings.length : 0,
        batteryEfficiency: completedBookings.length ? batteryEfficiency / completedBookings.length : 0,
        droneRoi: completedBookings.length ? droneROI / completedBookings.length : 0,
        yieldImprovement: completedBookings.length ? yieldImprovement / completedBookings.length : 0
      });
    };

    const calculateSocialStats = () => {
      const uniqueFarmers = new Set(completedBookings.map(b => b.farmer)).size;
      const uniqueVendors = new Set(completedBookings.map(b => b.vendor)).size;
      const totalArea = completedBookings.reduce((sum, booking) => sum + (booking.farmArea || 0), 0);
      
      setSocialStats({
        farmersImpacted: uniqueFarmers,
        ruralEntrepreneurs: uniqueVendors,
        genderRatio: "8:9",
        geographicalCoverage: totalArea,
        farmerHealthScore: completedBookings.length ? 
          completedBookings.reduce((sum, booking) => 
            sum + (booking.emissionSavedPerHectare ? 85 : 75), 0) / completedBookings.length : 0
      });
    };

    calculateEnvironmentalStats();
    calculateEconomicStats();
    calculateSocialStats();
  };

  const exportToExcel = () => {
    const filteredBookings = filterBookingsByDate(bookings)
      .filter(booking => booking.status === "completed" || booking.status === "closed");
    
    if (filteredBookings.length === 0) {
      toast.info("No KPI data available for the selected period, please select a different period.");
      return;
    }

    const data = filteredBookings.map(booking => ({
      "Booking ID": booking._id || '',
      "Date": new Date(booking.date).toLocaleDateString(),
      "Farmer Name": booking.farmerName || '',
      "Contact Number": booking.contactNumber || '',
      "Farm Area": booking.farmArea || 0,
      "Location": booking.farmLocation || '',
      "Crop Name": booking.cropName || '',
      "Status": booking.status || '',
      
      // Environmental Metrics
      "Water Usage (L)": booking.droneWaterUsage || 0,
      "Pesticide Usage": booking.dronePesticideUsage || 0,
      "Emission Saved (kg CO2/ha)": booking.emissionSavedPerHectare || 0,
      "Conventional Energy (kWh)": booking.conventionalEnergyConsumption || 0,
      "UAV Energy (kWh)": booking.uavEnergyConsumption || 0,
      
      // Economic Metrics
      "Quote Price": booking.quotePrice || 0,
      "Crop Output Per Acre": booking.cropOutputPerAcre || 0,
      "Flight Hours": booking.droneFlightHours || 0,
      "Charge Cycles": booking.chargeCycles || 0,
      "Battery Sets": booking.batterySetAvailable || 0,
      
      // Calculated Metrics
      "ROI (%)": booking.cropOutputPerAcre && booking.quotePrice ? 
        ((booking.cropOutputPerAcre - booking.quotePrice) / booking.quotePrice * 100).toFixed(2) : 0,
      "Energy Saved (%)": booking.conventionalEnergyConsumption && booking.uavEnergyConsumption ?
        ((booking.conventionalEnergyConsumption - booking.uavEnergyConsumption) / booking.conventionalEnergyConsumption * 100).toFixed(2) : 0
    }));

    // Add summary sheet data
    const summaryData = [{
      "Report Period": dateFilter,
      "Generated Date": new Date().toLocaleDateString(),
      "Total Bookings": filteredBookings.length,
      "Total Farmers": socialStats.farmersImpacted,
      "Total Area Covered": socialStats.geographicalCoverage,
      
      // Environmental Summary
      "Total Water Saved": environmentalStats.waterSaved,
      "Average Pesticide Reduction": environmentalStats.pesticideReduction,
      "Average Carbon Footprint Reduction": environmentalStats.carbonFootprint,
      "Total Energy Saved": environmentalStats.energyConsumption,
      "Total Emissions Reduced": environmentalStats.emissionReduction,
      
      // Economic Summary
      "Average ROI": economicStats.roiDroneSpraying,
      "Average Battery Efficiency": economicStats.batteryEfficiency,
      "Average Drone ROI": economicStats.droneRoi,
      "Average Yield Improvement": economicStats.yieldImprovement,
      
      // Social Summary
      "Farmers Impacted": socialStats.farmersImpacted,
      "Rural Entrepreneurs": socialStats.ruralEntrepreneurs,
      "Gender Ratio": socialStats.genderRatio,
      "Farmer Health Score": socialStats.farmerHealthScore
    }];

    const wb = XLSX.utils.book_new();
    
    const ws = XLSX.utils.json_to_sheet(data);
    const wsSummary = XLSX.utils.json_to_sheet(summaryData);
    
    // Auto-size columns for both sheets
    const makeColWidth = (data) => {
      const objectMaxLength = [];
      data.forEach((obj) => {
        Object.entries(obj).forEach(([key, value], idx) => {
          const valueLength = String(value).length;
          objectMaxLength[idx] = Math.max(
            objectMaxLength[idx] || 0,
            key.length,
            valueLength
          );
        });
      });
      return objectMaxLength.map((w) => ({ wch: w + 2 }));
    };

    ws['!cols'] = makeColWidth(data);
    wsSummary['!cols'] = makeColWidth(summaryData);

    XLSX.utils.book_append_sheet(wb, wsSummary, "Summary");
    XLSX.utils.book_append_sheet(wb, ws, "Detailed Report");

    const fileName = `Complete_KPI_Report_${dateFilter}_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <HomeContainer>
      <FilterHeader>
        <SectionTitle>KPI Dashboard Report</SectionTitle>
        <FilterGroup>
          <SelectDropdown 
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </SelectDropdown>
          <DownloadButton onClick={exportToExcel}>
            Export Complete Report <FaDownload />
          </DownloadButton>
        </FilterGroup>
      </FilterHeader>

      <Section>
        <SectionTitle>Overview Statistics</SectionTitle>
        <EnvironmentalReportContainer>
          <ReportCard>
            <ReportLabel>Total Farmer</ReportLabel>
            <ReportIcon src={totalfarmer} alt="Total Farmer" />
            <ReportValue color="#07B27B">{farmers.length}</ReportValue>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Total Vendor</ReportLabel>
            <ReportIcon src={totalvendor} alt="Total Vendor" />
            <ReportValue color="#FF9A01">{vendors.length}</ReportValue>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Total Runner</ReportLabel>
            <ReportIcon src={totalRunner} alt="Total Runner" />
            <ReportValue color="#529DDF">{runners.length}</ReportValue>
          </ReportCard>
        </EnvironmentalReportContainer>
      </Section>

      <Section>
        <SectionTitle>Environmental KPI Report</SectionTitle>
        <EnvironmentalReportContainer>
          <ReportCard>
            <ReportLabel>Water saved till now</ReportLabel>
            <ReportIcon src={waterIcon} alt="Water saved" />
            <ReportValue color="#5CB1FF">
              {environmentalStats.waterSaved.toFixed(2)} L
            </ReportValue>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Pesticide till now</ReportLabel>
            <ReportIcon src={pesticideIcon} alt="Pesticide usage" />
            <ReportValue color="#F1614B">
              {environmentalStats.pesticideReduction.toFixed(1)}%
            </ReportValue>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Carbon footprint</ReportLabel>
            <ReportIcon src={carbonFootprintIcon} alt="Carbon footprint" />
            <ReportValue color="#41B079">
              {environmentalStats.carbonFootprint.toFixed(1)}%
            </ReportValue>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Energy consumption</ReportLabel>
            <ReportIcon src={energy_consumption} alt="Energy consumption" />
            <ReportValue color="#41B079">
              Reduced by {environmentalStats.energyConsumption.toFixed(0)}
            </ReportValue> 
            <span>kWh/ha</span>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Total Emission Reduction</ReportLabel>
            <ReportIcon src={co2} alt="Total Emission Reduction" />
            <ReportValue color="#41B079">
              {environmentalStats.emissionReduction.toFixed(0)} kg CO2
            </ReportValue>
          </ReportCard>
        </EnvironmentalReportContainer>
      </Section>

      <Section>
        <SectionTitle>Economic KPI Report</SectionTitle>
        <EnvironmentalReportContainer>
          <ReportCard>
            <ReportLabel>ROI for Drone spraying</ReportLabel>
            <ReportIcon src={droneSpraying} alt="ROI for Drone spraying" />
            <ReportValue color="#5CB1FF">
              {economicStats.roiDroneSpraying.toFixed(1)}%
            </ReportValue>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Battery efficiency</ReportLabel>
            <ReportIcon src={battery} alt="Battery efficiency" />
            <ReportValue color="#F1614B">
              {economicStats.batteryEfficiency.toFixed(1)}
            </ReportValue>
            <span>Hours</span>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Drone ROI/ Drone life</ReportLabel>
            <ReportIcon src={droneroi} alt="Drone ROI/ Drone life" />
            <ReportValue color="#41B079">
              {economicStats.droneRoi.toFixed(1)}%
            </ReportValue>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Crop yield comparison</ReportLabel>
            <ReportIcon src={cropyield} alt="Crop yield comparison" />
            <ReportValue color="#41B079">
              {economicStats.yieldImprovement.toFixed(1)}%
            </ReportValue>
            <span>Increased</span>
          </ReportCard>
        </EnvironmentalReportContainer>
      </Section>

      <Section>
        <SectionTitle>Social KPI Report</SectionTitle>
        <EnvironmentalReportContainer>
          <ReportCard>
            <ReportLabel>Farmers Impacted</ReportLabel>
            <ReportIcon src={farmer} alt="Farmers Impacted" />
            <ReportValue color="#5CB1FF">
              {socialStats.farmersImpacted}
            </ReportValue>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Rural Entrepreneurs Impacted</ReportLabel>
            <ReportIcon src={rural} alt="Rural Entrepreneurs Impacted" />
            <ReportValue color="#34B987">
              {socialStats.ruralEntrepreneurs}
            </ReportValue>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Gender Ratio (Male:Female)</ReportLabel>
            <ReportIcon src={genderRatio} alt="Gender Ratio (Male:Female)" />
            <ReportValue color="#F1614B">
              {socialStats.genderRatio}
            </ReportValue>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Geographical Coverage</ReportLabel>
            <ReportIcon src={geo} alt="Geographical Coverage" />
            <ReportValue color="#41B079">
              {socialStats.geographicalCoverage.toFixed(0)} km²
            </ReportValue>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Farmer Health score</ReportLabel>
            <ReportIcon src={farmerHealth} alt="Farmer Health score" />
            <ReportValue color="#E85B6F">
              {socialStats.farmerHealthScore.toFixed(0)}
            </ReportValue>
          </ReportCard>
        </EnvironmentalReportContainer>
      </Section>
    </HomeContainer>
  );
};

export default Home;