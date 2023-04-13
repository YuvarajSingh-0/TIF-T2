import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import FormInput from "../../components/formComponents/FormInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { IJobDetails } from "../../interface/forms";

const JobDetailsForm: React.FC<{
  onJobValuesChange: (data: IJobDetails) => void,
  handleTab: (n: PageNumbers) => void;
}> = ({ handleTab, onJobValuesChange }) => {
  const { handleChange: formikHandleChange, errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    isValid,
  } = useFormik<IJobDetails>({
    initialValues: {
      jobTitle: "",
      jobDetails: "",
      jobLocation: "",
    },
    validationSchema: Yup.object().shape({
      jobTitle: Yup.string().required("Job Title is required"),
      jobDetails: Yup.string().required("Job Details is required"),
      jobLocation: Yup.string().required("Job Location is required"),
    }),

    onSubmit: (values) => {
      console.log({ values });
      handleTab(2);
    },
  });

  const [jobValues, setJobValues] = React.useState<IJobDetails>({
    jobTitle: "",
    jobDetails: "",
    jobLocation: "",
  });

  const handleJobValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobValues({ ...jobValues, [e.target.name]: e.target.value });
    onJobValuesChange({ ...jobValues, [e.target.name]: e.target.value });
    formikHandleChange(e);
  };



  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={handleJobValues}
          onBlur={handleBlur}
          value={values?.jobTitle}
          error={errors?.jobTitle}
          touched={touched?.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={handleJobValues}
          onBlur={handleBlur}
          value={values?.jobDetails}
          error={errors?.jobDetails}
          touched={touched?.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={handleJobValues}
          onBlur={handleBlur}
          error={errors.jobLocation}
          touched={touched.jobLocation}
          value={values.jobLocation}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => handleTab(0)}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;


