import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/resources.css';

function Resources() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true); // trigger animation when page loads
  }, []);

  const resources = [
    {
      title: "Fact Checking Tips for Students",
      description1: "Artificial Intelligence helps students and teachers identify fake or misleading education-related news. It can quickly analyze large amounts of information, check sources, and compare facts to find content that looks suspicious or incorrect. This makes it easier for learners and educators to trust the information they read online and avoid being confused by false claims.",
      description2: "At the same time, AI supports educators and students by providing tools to verify information before using it in assignments, research, or teaching materials. It encourages critical thinking and responsible use of online content, helping create a safer and more reliable learning environment where decisions are based on accurate and verified knowledge."
    },
    {
      title: "Reliable Sources in Education",
      description1: "Relying on trusted sources in education is important because it helps students and teachers use accurate and credible information. When people use reliable books, academic websites, research papers, and official educational platforms, they can be more confident that the content is correct. This reduces the risk of learning false information and helps improve the overall quality of education and understanding.",
      description2: "Identifying reliable sources means checking who created the information, whether the author is qualified, and if the content is supported by evidence or references. Trusted sources are usually published by recognized institutions, universities, government organizations, or well known experts. Learning how to choose the right sources helps students build strong research skills and make better academic decisions."
    },
    {
      title: "Impact of Fake News on Education",
      description1: "Fake news can seriously affect students, teachers, and the overall learning process. When students believe incorrect information, it can confuse their understanding of important topics and lead to poor academic performance. Misinformation can also spread quickly on social media, making it harder for learners to know what is true and what is not.",
      description2: "Teachers are also impacted because they must spend extra time correcting false information and guiding students toward accurate sources. Over time, fake news can reduce trust in educational content and institutions. Understanding this impact helps students and educators become more careful, think critically, and focus on using reliable information for better educational outcomes."
    },
    {
      title: "Role of Machine Learning in Fake News Detection",
      description1: "Machine learning plays an important role in detecting fake educational news by teaching computers how to recognize patterns in information. These models are trained using large amounts of data that include both real and fake news examples. By learning the differences between trustworthy and misleading content, the system becomes better at spotting signs like false claims, suspicious language, or unreliable sources.",                
      description2: "Once trained, machine learning models can automatically analyze new content found online and give an indication of whether it is likely to be true or false. This helps students and teachers save time and avoid being misled by incorrect information. It also supports safer learning environments by encouraging the use of accurate, verified educational content."
    },
    {
      title: "Social Media and Fake Education News",
      description1: "Fake education news spreads quickly on social media because people often share information without checking if it is true. Sensational headlines, emotional posts, and misleading images can easily attract attention, causing students and teachers to believe and forward false content. This creates confusion and can harm learning by spreading incorrect ideas about exams, admissions, scholarships, or education policies.",
      description2: "To prevent this, users should verify information before sharing it. They can check official websites, trusted news platforms, and reliable educational institutions for confirmation. Social media platforms and users both have a responsibility to report false content, promote digital literacy, and encourage critical thinking so that accurate information spreads instead of misinformation."          
    }
  ];

  return (
    <>
      <Navbar />

      <div className={`resources-wrapper ${animate ? 'fade-in' : ''}`}>
        <h1 className="resources-heading">Trusted News Resources (Pakistan)</h1>
        <p className="resources-subtitle">
          These platforms are widely used for verifying news and understanding real events in simple language.
        </p>

        {resources.map((res, index) => (
          <div className={`resource-card ${animate ? 'card-animate' : ''}`} key={index} style={{animationDelay: `${index * 0.15}s`}}>
            <div className="left-stripe"></div>
            <div className="card-content">
              <h2>{res.title}</h2>
              <p>{res.description1}</p>
              <p>{res.description2}</p>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}

export default Resources;
