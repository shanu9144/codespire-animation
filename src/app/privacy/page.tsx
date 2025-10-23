'use client';

import { motion } from 'framer-motion';
import { Shield, Users, Globe, FileText, Lock, Eye, Settings, Mail } from 'lucide-react';
import { Wrapper } from '@/components/ui';
import { Heading, Text } from '@/components/ui/Typography';
import { fontClasses } from '@/config/fonts';

const PrivacyPage = () => {
  const sections = [
    {
      id: 1,
      title: "Who We Are",
      icon: Users,
      content: "CodeSpire Solutions is located at Ohio. We provide IT services and IT and non-IT staffing solutions to clients globally."
    },
    {
      id: 2,
      title: "Information We Collect",
      icon: FileText,
      content: "We collect various types of personal information depending on the nature of your interaction with us. This may include:",
      details: [
        "Contact Information: Name, address, email address, phone number, and other similar identifiers.",
        "Professional Information: Job title, company name, industry, work history, skills, and qualifications.",
        "Technical Information: IP address, browser type, operating system, device identifiers, usage data, and information collected through cookies and similar technologies.",
        "Account Information: Username, password, and other credentials used to access our Services.",
        "Communication Preferences: Your preferences for receiving marketing and other communications from us.",
        "Recruitment Information: For job applicants, this may include your resume, cover letter, education history, employment history, references, and other information you provide during the application process.",
        "Client and Project Information: Information related to the IT services and staffing solutions we provide to you or your organization, including project details, requirements, and feedback.",
        "Website Usage Information: Information about your activity on our websites, such as pages visited, links clicked, and documents downloaded.",
        "Marketing and Sales Information: Information related to our marketing activities and your interactions with our sales and marketing materials.",
        "Other Information: Any other information you choose to provide to us."
      ]
    },
    {
      id: 3,
      title: "How We Collect Your Information",
      icon: Settings,
      content: "We collect your personal information through various means, including:",
      details: [
        "Direct Interactions: When you provide information to us directly, such as when you fill out forms on our website, contact us by phone or email, register for events, apply for jobs, or engage with our sales and marketing activities.",
        "Automated Technologies: We collect certain information automatically when you interact with our websites and online services through cookies, web beacons, and other similar technologies.",
        "Third-Party Sources: We may receive information about you from third-party sources, such as:",
        "• Business Partners: Organizations we collaborate with to provide services or conduct joint marketing activities.",
        "• Recruitment Agencies: For job applicants.",
        "• Social Media Platforms: If you interact with our social media pages.",
        "• Publicly Available Sources: Information found in public records or online directories."
      ]
    },
    {
      id: 4,
      title: "How We Use Your Information",
      icon: Eye,
      content: "We use your personal information for various purposes, including:",
      details: [
        "Providing and Managing Our Services: To deliver the IT services and staffing solutions you or your organization have requested, manage your account, and communicate with you about our Services.",
        "Recruitment: To process and evaluate job applications, conduct interviews, and communicate with applicants.",
        "Marketing and Communications: To send you marketing materials, newsletters, and other information about our Services and events that may be of interest to you, in accordance with your communication preferences.",
        "Improving Our Services and Websites: To analyze website usage, conduct research and development, and enhance our Services and online platforms.",
        "Personalization: To personalize your experience with our Services and tailor our communications to your interests.",
        "Analytics: To analyze trends and gather statistical information about our website visitors and customers.",
        "Security and Fraud Prevention: To protect our websites and Services and to detect and prevent fraudulent activities.",
        "Legal and Compliance: To comply with applicable laws, regulations, and legal processes.",
        "Other Legitimate Business Purposes: To support our legitimate business interests, such as managing our business operations and conducting internal audits."
      ]
    },
    {
      id: 5,
      title: "How We Share Your Information",
      icon: Globe,
      content: "We may share your personal information with various categories of recipients:",
      details: [
        "Affiliates: Our subsidiaries and affiliated companies for the purposes described in this Privacy Notice.",
        "Service Providers: Third-party vendors who provide services on our behalf, such as website hosting, data analytics, email delivery, marketing automation, and payment processing. These service providers are contractually obligated to protect your information.",
        "Business Partners: Organizations we collaborate with to provide specific services or conduct joint marketing activities.",
        "Clients (for Staffing Services): We may share candidate information with clients who are considering them for employment.",
        "Legal Authorities: When required by law, legal process, or government request.",
        "In Connection with Business Transfers: In the event of a merger, acquisition, or other corporate transaction.",
        "With Your Consent: We may share your information with third parties when you provide your explicit consent."
      ]
    },
    {
      id: 6,
      title: "International Data Transfers",
      icon: Globe,
      content: "As a global organization, we may transfer your personal information to countries outside of your country of residence, which may have different data protection laws. We will implement appropriate safeguards to ensure the protection of your personal information in accordance with applicable data protection laws, such as:",
      details: [
        "Standard Contractual Clauses: We may use Standard Contractual Clauses approved by the European Commission or other applicable authorities.",
        "Adequacy Decisions: We may transfer personal information to countries that have been deemed to provide an adequate level of protection.",
        "Other Legally Permissible Mechanisms: We will rely on other legally recognized transfer mechanisms as appropriate."
      ]
    },
    {
      id: 7,
      title: "Your Rights and Choices",
      icon: Shield,
      content: "Depending on your location and applicable law, you may have certain rights regarding your personal information, including:",
      details: [
        "Right to Access: You may have the right to request access to the personal information we hold about you.",
        "Right to Rectification: You may have the right to request that we correct any inaccurate or incomplete personal information.",
        "Right to Erasure (Right to be Forgotten): You may have the right to request that we delete your personal information under certain circumstances.",
        "Right to Restriction of Processing: You may have the right to request that we restrict the processing of your personal information under certain circumstances.",
        "Right to Data Portability: You may have the right to receive your personal information in a structured, commonly used, and machine-readable format and to transmit it to another controller.",
        "Right to Object: You may have the right to object to the processing of your personal information for certain purposes, such as direct marketing.",
        "Rights Related to Automated Decision-Making: You may have rights related to automated decision-making, including profiling.",
        "Right to Withdraw Consent: If we are processing your personal information based on your consent, you have the right to withdraw your consent at any time.",
        "Right to Lodge a Complaint: You may have the right to lodge a complaint with a data protection authority in your jurisdiction."
      ],
      note: "To exercise your rights, please contact us using the contact information provided in the Contact Us page. We will respond to your request in accordance with applicable law. We may need to verify your identity before processing your request."
    },
    {
      id: 8,
      title: "Data Security",
      icon: Lock,
      content: "We have implemented reasonable technical and organizational measures designed to protect your personal information from unauthorized access, use, disclosure, alteration, or destruction. These measures take into account the state of the art, the costs of implementation, and the nature, scope, context, and purposes of processing as well as the risk of varying likelihood and severity for the rights and freedoms of natural persons."
    },
    {
      id: 9,
      title: "Data Retention",
      icon: FileText,
      content: "We will retain your personal information for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements. The specific retention period will depend on the nature of the information and the purposes for which it is processed."
    },
    {
      id: 10,
      title: "Cookies and Similar Technologies",
      icon: Settings,
      content: "Our websites use cookies and other similar technologies to collect information about your browsing activities. You can control the use of cookies through your browser settings. For more information about our use of cookies, please see our Cookie Policy."
    },
    {
      id: 11,
      title: "Contact Us",
      icon: Mail,
      content: "If you have any questions or concerns about this Privacy Notice or our data privacy practices, please submit your queries in the contact us section."
    },
    {
      id: 12,
      title: "Updates to this Privacy Notice",
      icon: FileText,
      content: "We may update this Privacy Notice from time to time to reflect changes in our data privacy practices. We will post the updated version on our website and indicate the date of the last update. We encourage you to review this Privacy Notice periodically."
    },
    {
      id: 13,
      title: "Specific Provisions for Certain Jurisdictions",
      icon: Globe,
      content: "Include any specific provisions required by the data protection laws of certain jurisdictions where you operate or have customers. For example:",
      details: [
        "EEA and UK: Information about your Data Protection Officer (DPO), legal basis for processing, and rights under GDPR.",
        "California (CCPA/CPRA): Information about your rights as a California resident and how to exercise them, including the right to opt-out of the sale or sharing of personal information.",
        "Other Regions: Details about specific legal requirements in those regions."
      ],
      note: "By continuing to use our Services after the effective date of any updated Privacy Notice, you acknowledge your acceptance of the revised terms."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5" />
        
        <Wrapper>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <Heading level={1} size="h1" className="mb-6 text-3xl md:text-4xl lg:text-5xl font-bold">
              <span className="text-gray-900">Privacy Policy</span>
            </Heading>
            
            <Text size="body-lg" color="secondary" className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              This Privacy Notice describes how CodeSpire Solutions and its affiliates (collectively, "CodeSpire," "we," "us," or "our") collect, use, disclose, and otherwise process your personal information in connection with our websites, applications, products, services, events, and other interactions with you (collectively, our "Services"). This Privacy Notice applies to individuals globally who interact with CodeSpire, including our customers, website visitors, job applicants, and business partners.
            </Text>
          </motion.div>
        </Wrapper>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <Wrapper>
          <div className="max-w-4xl mx-auto space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <Heading level={2} size="h2" className="text-2xl font-bold text-gray-900 mb-4">
                      {section.id}. {section.title}
                    </Heading>
                    
                    <Text size="body-lg" color="secondary" className="text-gray-700 leading-relaxed mb-4">
                      {section.content}
                    </Text>

                    {section.details && (
                      <ul className="space-y-3">
                        {section.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                            <Text size="body" color="secondary" className="text-gray-700 leading-relaxed">
                              {detail}
                            </Text>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.note && (
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <Text size="body" color="secondary" className="text-gray-700 leading-relaxed">
                          <strong>Note:</strong> {section.note}
                        </Text>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Wrapper>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50/50">
        <Wrapper>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>
              
              <Heading level={2} size="h2" className="text-3xl font-bold text-gray-900 mb-6">
                Questions About Our Privacy Policy?
              </Heading>
              
              <Text size="body-lg" color="secondary" className="text-gray-600 text-lg leading-relaxed mb-8">
                If you have any questions or concerns about this Privacy Notice or our data privacy practices, please don't hesitate to contact us.
              </Text>
              
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Us
              </motion.a>
            </div>
          </motion.div>
        </Wrapper>
      </section>
    </div>
  );
};

export default PrivacyPage;
