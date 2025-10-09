import Wrapper from "../../components/ui/Wrapper";
import Button from "../../components/ui/Button";
import AnimatedLoadingSkeleton from "../../components/ui/animated-loading-skeleton";
import { Download, Mail, Phone, ArrowRight } from "lucide-react";

export default function Products() {
  return (
    <div className="min-h-screen bg-white">
      <section className="space-section">
        <Wrapper>
          <div className="max-w-5xl mx-auto">
            <h1 className="text-h1 text-accent mb-4">Products</h1>
            <p className="text-body-lg text-gray-700">
              Explore our AI products built to accelerate manufacturing, sourcing, and planning.
            </p>
          </div>
        </Wrapper>
      </section>

      {/* Product 1: Smart RFQ AI */}
      <section className="space-section">
        <Wrapper>
          <div className="grid-2 items-start">
            <div>
              <h2 className="text-h2 text-accent mb-3">Smart RFQ AI — Intelligent quoting for modern manufacturing</h2>
              <p className="text-body mb-6 text-gray-700">
                Turn 2D/3D drawings into accurate, professional quotes in minutes. Reduce manual effort, speed RFQ cycles, and win more orders.
              </p>
              <ul className="space-y-2 mb-6 text-gray-700">
                <li>• Automated CAD-to-quote: auto-interpret 2D & 3D designs and extract manufacturing requirements.</li>
                <li>• Data-driven costing: precise machining time, material, and overhead estimates.</li>
                <li>• Instant, professional delivery: generate and send quotes that are bid-ready</li>
              </ul>
              <div className="flex gap-3 mb-10">
                <Button className="btn btn-primary">
                  Request a demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button className="btn btn-secondary" variant="secondary">
                  <Download className="mr-2 h-4 w-4" /> Download datasheet
                </Button>
              </div>

              <div className="grid-2">
                <div className="space-y-3">
                  <h3 className="text-h3 text-gray-900">Key capabilities</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>2D & 3D design mapping Automatically interprets common CAD and drawing formats...</li>
                    <li>AI Quoting Engine Produces accurate, configurable quotes in minutes...</li>
                    <li>Process prediction Identifies the most likely machining routes...</li>
                    <li>Machining time calculation Calculates precise cycle times...</li>
                    <li>Cost setup & management Centralize and manage overheads and vendor rates.</li>
                    <li>AI insights & learning Learns from historical RFQs to improve estimates.</li>
                    <li>Auto quote delivery Generates professional, branded quote documents.</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-h3 text-gray-900">Benefits & ROI</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>For estimators & quoting teams — cut manual quoting time.</li>
                    <li>For operations & production — more accurate cycle times.</li>
                    <li>For sales & management — faster responses and better win rates.</li>
                  </ul>
                  <h3 className="text-h3 text-gray-900 mt-6">Integrations & compatibility</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>CAD & drawings, ERP/MES/PLM, vendor management, CRM & email</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <AnimatedLoadingSkeleton />
            </div>
          </div>
        </Wrapper>
      </section>

      {/* Product 2: Supplier Match AI */}
      <section className="space-section bg-gray-50">
        <Wrapper>
          <div className="grid-2 items-start">
            <div>
              <h2 className="text-h2 text-accent mb-3">Supplier Match AI — Smarter Supplier Selection for Modern Sourcing</h2>
              <p className="text-body mb-6 text-gray-700">
                Discover, match, and validate suppliers in minutes. AI-powered sourcing that maximizes savings, improves quality, and accelerates RFQ closures.
              </p>
              <ul className="space-y-2 mb-6 text-gray-700">
                <li>• Intelligent supplier discovery using real-time data.</li>
                <li>• Automated RFQ-to-supplier matching for best-fit recommendations.</li>
                <li>• Pre-check validations to eliminate incomplete RFQs.</li>
              </ul>
              <div className="flex gap-3 mb-10">
                <Button className="btn btn-primary">
                  Request a demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button className="btn btn-secondary" variant="secondary">
                  <Download className="mr-2 h-4 w-4" /> Download datasheet
                </Button>
              </div>
              <div className="space-y-3 text-gray-700">
                <h3 className="text-h3 text-gray-900">The Challenge</h3>
                <p>Traditional sourcing is riddled with inefficiencies...</p>
                <h3 className="text-h3 text-gray-900">The Solution</h3>
                <ul className="space-y-2">
                  <li>AI Discovery, Intelligent Matching, Pre-flight Validation, Smart Ranking, Self-learning Engine</li>
                </ul>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop"
                alt="Supplier analytics"
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </Wrapper>
      </section>

      {/* Product 3: Forecast AI */}
      <section className="space-section">
        <Wrapper>
          <div className="grid-2 items-start">
            <div>
              <h2 className="text-h2 text-accent mb-3">Forecast AI — Predict What’s Next, Plan with Confidence</h2>
              <p className="text-body mb-6 text-gray-700">
                AI-powered forecasting that identifies demand shifts, predicts revenue trends, and empowers smarter business planning across sales, operations, and supply chains.
              </p>
              <ul className="space-y-2 mb-6 text-gray-700">
                <li>• AI-driven forecasting for sales, operations, and finance.</li>
                <li>• Real-time trend detection and scenario simulations.</li>
                <li>• Smarter planning that drives profitability and agility.</li>
              </ul>
              <div className="flex gap-3 mb-10">
                <Button className="btn btn-primary">
                  Request a demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button className="btn btn-secondary" variant="secondary">
                  <Download className="mr-2 h-4 w-4" /> Download datasheet
                </Button>
              </div>
              <div className="space-y-3 text-gray-700">
                <h3 className="text-h3 text-gray-900">Key Capabilities</h3>
                <ul className="space-y-2">
                  <li>Sales forecasting, operational planning, revenue projections</li>
                  <li>Scenario simulations and early trend detection</li>
                  <li>Unified analytics dashboard and continuous learning</li>
                </ul>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop"
                alt="Forecast dashboards"
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </Wrapper>
      </section>

      {/* Footer CTA */}
      <section className="space-section bg-gray-50">
        <Wrapper>
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-h2 text-accent mb-3">Ready to see Smart RFQ AI in action?</h3>
            <div className="flex items-center justify-center gap-3 flex-wrap mb-6">
              <Button className="btn btn-primary">
                Request a demo
              </Button>
              <a href="tel:+16028373370" className="btn btn-secondary inline-flex items-center">
                <Phone className="mr-2 h-4 w-4" /> (602) 837-3370
              </a>
              <a href="mailto:info@codespiresolutions.com" className="btn btn-outline inline-flex items-center">
                <Mail className="mr-2 h-4 w-4" /> info@codespiresolutions.com
              </a>
            </div>
          </div>
        </Wrapper>
      </section>
    </div>
  );
}