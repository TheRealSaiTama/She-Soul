
import React from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import FeatureModule from "@/components/FeatureModule";
import { Calendar, Thermometer, Heart, Activity, User, Users } from "lucide-react";

const Index = () => {
  const features = [
    {
      title: "Cycle Tracking",
      description: "Track your period, symptoms, and get personalized predictions to understand your body better.",
      icon: Calendar,
      color: "bg-shesoul-bubblegum",
      path: "/cycle"
    },
    {
      title: "Menopause Management",
      description: "Navigate this transition with symptom tracking, personalized recommendations, and expert resources.",
      icon: Thermometer,
      color: "bg-shesoul-pastel",
      path: "/menopause"
    },
    {
      title: "Breast Health",
      description: "Access risk assessments, self-examination guides, and personalized care plans for breast health.",
      icon: Heart,
      color: "bg-shesoul-sunflower",
      path: "/breast-health"
    },
    {
      title: "Reproductive Health",
      description: "Comprehensive resources and tracking for all aspects of your reproductive wellbeing.",
      icon: Activity,
      color: "bg-shesoul-peach",
      path: "/reproductive-health"
    },
    {
      title: "Workplace Wellness",
      description: "Tools and resources for managing women's health in workplace settings and self-advocacy.",
      icon: User,
      color: "bg-shesoul-bubblegum",
      path: "/workplace"
    },
    {
      title: "Doctor Consultation",
      description: "Connect with verified specialists through secure video consultations and appointment scheduling.",
      icon: Users,
      color: "bg-shesoul-pastel",
      path: "/doctors"
    }
  ];

  return (
    <Layout>
      <Hero />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Your Complete Women's Health <span className="text-shesoul-bubblegum">Companion</span>
            </h2>
            <p className="text-lg text-gray-600">
              She&Soul provides personalized tracking, education, and support for every aspect 
              of women's health throughout your life journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <FeatureModule
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                color={feature.color}
                path={feature.path}
              />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gradient-to-br from-shesoul-blush via-white to-shesoul-blush">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-3xl font-bold mb-6">
                Why Choose <span className="text-shesoul-bubblegum">She&Soul</span>?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="circle-icon bg-shesoul-bubblegum shrink-0">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-medium mb-1">Personalized Care</h3>
                    <p className="text-gray-600">Advanced algorithms create a unique health profile based on your data.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="circle-icon bg-shesoul-pastel shrink-0">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-medium mb-1">Expert Resources</h3>
                    <p className="text-gray-600">Access medically verified content and tools created by women's health specialists.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="circle-icon bg-shesoul-sunflower shrink-0">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-medium mb-1">Privacy First</h3>
                    <p className="text-gray-600">Your health data is encrypted and never sold to third parties.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="circle-icon bg-shesoul-peach shrink-0">
                    <span className="text-xl font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-medium mb-1">Holistic Approach</h3>
                    <p className="text-gray-600">Supporting your physical, emotional, and social wellbeing at every life stage.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="card-glow p-8 bg-white">
                <div className="text-center mb-6">
                  <h3 className="font-serif text-2xl font-bold mb-2">Join Our Community</h3>
                  <p className="text-gray-600">Join thousands of women taking control of their health journey.</p>
                </div>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      className="w-full px-4 py-3 rounded-full border border-shesoul-pastel focus:outline-none focus:ring-2 focus:ring-shesoul-bubblegum"
                    />
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      className="w-full px-4 py-3 rounded-full border border-shesoul-pastel focus:outline-none focus:ring-2 focus:ring-shesoul-bubblegum"
                    />
                    <button 
                      type="submit" 
                      className="w-full bg-shesoul-bubblegum text-white py-3 rounded-full font-medium hover:bg-opacity-90 transition-all"
                    >
                      Get Started
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-4">
                    By signing up, you agree to our Terms of Service and Privacy Policy
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Start Your <span className="text-shesoul-bubblegum">Wellness</span> Journey Today
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of women who are taking control of their health with personalized tracking and support.
            </p>
            <button className="bg-shesoul-bubblegum text-white px-8 py-4 rounded-full font-medium hover:bg-opacity-90 transition-all">
              Create Free Account
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
