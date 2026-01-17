import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getBanner, getChooseUs, getCourses, getFeedBack, getVideo, getVideoReview } from "../../api/api";
import Banner from "../../components/banner/Banner";
import ChooseUs from "../../components/chooseUs/ChooseUs";
import OurCompany from "../../components/ourCompany/ourCompany";
import CoursesPreview from "../../components/coursesPreview/CoursesPreview";
import VideoReviews from "../../components/videoReviews/VideoReviews";
import ContactForm from "../../components/contactForm/ContactForm";
import Feedback from "../../components/feedback/Feedback";
import LocationMap from "../../components/locationMap/LocationMap";

const Home = () => {
    const { t, i18n } = useTranslation();

    const { data: bannerData, isLoading: bannerLoading } = useQuery({
        queryKey: ['banner', i18n.language],
        queryFn: () => getBanner(i18n.language),
    });

    const { data: chooseUsData } = useQuery({
        queryKey: ['chooseUs', i18n.language],
        queryFn: () => getChooseUs(i18n.language),
    });

    const { data: videoData } = useQuery({
        queryKey: ['video'],
        queryFn: () => getVideo(),
    });

    const { data: coursesData } = useQuery({
        queryKey: ['courses', i18n.language],
        queryFn: () => getCourses(i18n.language),
    });

    const { data: videoReviewData } = useQuery({
        queryKey: ['videoReview', i18n.language],
        queryFn: () => getVideoReview(i18n.language),
    });

    const { data: feedbackData } = useQuery({
        queryKey: ['feedback', i18n.language],
        queryFn: () => getFeedBack(i18n.language),
    });

    return (
        <div className="space-y-12">
            {bannerLoading ? (
                <div className="w-full h-64 md:h-[400px] bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl animate-pulse flex items-center justify-center">
                    <div className="text-gray-400">{t('pages.home.title')}...</div>
                </div>
            ) : (
                <Banner data={bannerData?.data || []} />
            )}

            <ChooseUs data={chooseUsData?.data || []} />

            <OurCompany data={videoData?.data || []} />

            <CoursesPreview data={coursesData?.data || []} />

            <VideoReviews data={videoReviewData?.data || []} />

            <Feedback data={feedbackData?.data || []} />

            <ContactForm />

            <LocationMap />
        </div>
    );
};

export default Home;
