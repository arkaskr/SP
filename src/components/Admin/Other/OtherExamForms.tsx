import { Sub } from "@radix-ui/react-navigation-menu";
import SubjectManagement from "./SubjectManagement";
// import Test from "./test";
import ExamCategoryForm from "./ExamCategoryForm";

const OtherExamForms = () => {
    return (
        <div> 
            <SubjectManagement />
            <ExamCategoryForm />
            {/* <Test /> */}
        </div>
    );
}

export default OtherExamForms;