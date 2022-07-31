import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddressForm from "../../sections/checkout/addressForm.section";
import PaymentForm from "../../sections/checkout/paymentForm.section";
import Review from "../../sections/checkout/review.section";
import { Fragment, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

const steps = ["Delivery address", "Payment details", "Review your order"];

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [deliveryDetails, setDeliveryDetails] = useState<any>({});

  const { state }: any = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (state !== null) {
      if (state.checkouts && state.checkouts.length) {
      } else {
        navigate(-1);
      }
    } else navigate(-1);
  }, []);

  console.log(state);

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
    setDeliveryDetails(data);
    if (activeStep === 0) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <AddressForm deliveryDetails={deliveryDetails} onSubmit={onSubmit} />
        );
      case 1:
        return <PaymentForm />;
      case 2:
        return (
          <Review
            products={state.checkouts}
            deliveryDetails={deliveryDetails}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  //remember choosen

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center" color="inherit">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Fragment>
          {activeStep === steps.length ? (
            <Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </Fragment>
          ) : (
            <Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <>
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>

                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {activeStep === steps.length - 1 ? "Place order" : "Next"}
                    </Button>
                  </>
                )}
              </Box>
            </Fragment>
          )}
        </Fragment>
      </Paper>
    </Container>
  );
}
