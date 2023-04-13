import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  TabProps,
  Box,
  Grid,
} from "@chakra-ui/react";
import React, { useState } from "react";
import InterviewSettingsForm from "./InterviewSettingsForm";
import JobDetailsForm from "./JobDetailsForm";
import RequisitionForm from "./RequisitionDetailsForm";
import DisplayCard from "./PreviewCard";
import { PageNumbers } from "../../interface/home";
import { IJobDetails } from "../../interface/forms";
import { IRequisitionDetails } from "../../interface/forms";
import { IInterViewSettings } from "../../interface/forms";

const CustomTab: React.FC<TabProps> = ({ children, ...props }) => {
  return (
    <Tab p="1rem" fontFamily="Poppins" {...props}>
      {children}
    </Tab>
  );
};

const HomeLayout = () => {
  const [page, setPage] = useState<PageNumbers>(0);
  const [requisitionDetails, setRequisitionDetails] = useState<IRequisitionDetails>();
  const [jobValues, setJobValues] = useState<IJobDetails>();
  const [interviewSettings, setInterviewSettings] = useState<IInterViewSettings>();

  const handleJobValues = (data: IJobDetails) => {
    setJobValues(data);
  };

  const handleInterviewChange = (data: IInterViewSettings) => {
    setInterviewSettings(data);
  };

  const handleRequisitionChange = (data: IRequisitionDetails) => {
    setRequisitionDetails(data);
  };



  const handlePage = (pageNumber: PageNumbers) => {
    setPage(pageNumber);
  };

  return (
    <Box w="100%">
      <Container maxW="1200px">
        <Heading fontFamily="Poppins" fontSize="1.5rem" my="2rem">
          Create Candidate Requisition
        </Heading>
        <Tabs index={page} isLazy lazyBehavior="keepMounted">
          <TabList>
            <CustomTab>Requistion Details</CustomTab>
            <CustomTab>Job Details</CustomTab>
            <CustomTab>Interview Settings</CustomTab>
          </TabList>
          <Grid display="grid" gridTemplateColumns="3fr 2fr" gap="24px">
            <TabPanels>
              <TabPanel>
                <RequisitionForm onRequisitionChange={handleRequisitionChange} handleTab={handlePage} />
              </TabPanel>
              <TabPanel>
                <JobDetailsForm onJobValuesChange={handleJobValues} handleTab={handlePage} />
              </TabPanel>
              <TabPanel>
                <InterviewSettingsForm onInterviewValuesChange={handleInterviewChange} handleTab={handlePage} />
              </TabPanel>
            </TabPanels>
            <DisplayCard interviewSettings={interviewSettings} requisitionDetails={requisitionDetails} jobDetails={jobValues} />
          </Grid>
        </Tabs>
      </Container>
    </Box>
  );
};

export default HomeLayout;
