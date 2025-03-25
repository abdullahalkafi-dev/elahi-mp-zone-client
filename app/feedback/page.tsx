import FeedbackForm from "../../components/feedback-form";

const Feedback = () => {
  return (
    <div className="bg-white">
      <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
        <FeedbackForm />
      </main>
    </div>
  );
};

export default Feedback;
