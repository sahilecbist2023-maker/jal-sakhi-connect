import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  Users,
  Droplets,
  Activity,
  BarChart3,
  Send,
  Clock,
  TrendingUp,
  MapPin,
  Settings,
  Bell
} from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export function AdminDashboard() {
  const { t } = useLanguage();
  const [reportForm, setReportForm] = useState({ technician: '', message: '', priority: 'medium' });

  const divisions = [
    { 
      id: 'rampur', 
      name: 'रामपुर / Rampur', 
      wqi: 85, 
      status: 'good', 
      pumpMode: 'auto',
      pumpStatus: 'running',
      complaints: 2,
      population: 1250,
      runtime: 18.5,
      pressure: 42.3,
      leakages: 0
    },
    { 
      id: 'danapur', 
      name: 'दानापुर / Danapur', 
      wqi: 72, 
      status: 'moderate', 
      pumpMode: 'manual',
      pumpStatus: 'stopped',
      complaints: 5,
      population: 980,
      runtime: 12.2,
      pressure: 38.1,
      leakages: 1
    },
    { 
      id: 'sagar', 
      name: 'सागर / Sagar', 
      wqi: 91, 
      status: 'good', 
      pumpMode: 'auto',
      pumpStatus: 'running',
      complaints: 1,
      population: 1450,
      runtime: 22.1,
      pressure: 45.8,
      leakages: 0
    },
    { 
      id: 'madhopur', 
      name: 'मधोपुर / Madhopur', 
      wqi: 68, 
      status: 'moderate', 
      pumpMode: 'manual',
      pumpStatus: 'maintenance',
      complaints: 8,
      population: 1120,
      runtime: 0,
      pressure: 0,
      leakages: 2
    },
    { 
      id: 'gopalganj', 
      name: 'गोपालगंज / Gopalganj', 
      wqi: 45, 
      status: 'unsafe', 
      pumpMode: 'auto',
      pumpStatus: 'running',
      complaints: 12,
      population: 890,
      runtime: 16.8,
      pressure: 35.2,
      leakages: 3
    },
    { 
      id: 'chandipur', 
      name: 'चंदीपुर / Chandipur', 
      wqi: 88, 
      status: 'good', 
      pumpMode: 'auto',
      pumpStatus: 'running',
      complaints: 3,
      population: 1350,
      runtime: 20.3,
      pressure: 44.1,
      leakages: 0
    }
  ];

  const recentComplaints = [
    { id: 1, division: 'गोपालगंज', issue: 'पानी में मिट्टी', status: 'pending', priority: 'high', time: '2 hours ago' },
    { id: 2, division: 'मधोपुर', issue: 'पंप काम नहीं कर रहा', status: 'in-progress', priority: 'high', time: '4 hours ago' },
    { id: 3, division: 'दानापुर', issue: 'कम पानी का दबाव', status: 'pending', priority: 'medium', time: '6 hours ago' },
    { id: 4, division: 'चंदीपुर', issue: 'पाइप में लीकेज', status: 'resolved', priority: 'medium', time: '1 day ago' },
    { id: 5, division: 'रामपुर', issue: 'अनियमित आपूर्ति', status: 'pending', priority: 'low', time: '2 days ago' }
  ];

  const systemMetrics = {
    totalPopulation: divisions.reduce((sum, div) => sum + div.population, 0),
    averageWQI: Math.round(divisions.reduce((sum, div) => sum + div.wqi, 0) / divisions.length),
    activePumps: divisions.filter(div => div.pumpStatus === 'running').length,
    totalComplaints: divisions.reduce((sum, div) => sum + div.complaints, 0),
    totalLeakages: divisions.reduce((sum, div) => sum + div.leakages, 0),
    averagePressure: Math.round(divisions.reduce((sum, div) => sum + div.pressure, 0) / divisions.length * 10) / 10
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="h-4 w-4 text-safe" />;
      case 'moderate': return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'unsafe': return <AlertTriangle className="h-4 w-4 text-danger" />;
      default: return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'safe';
      default: return 'muted';
    }
  };

  const sendReportToTechnician = () => {
    // Simulate sending report
    console.log('Report sent:', reportForm);
    setReportForm({ technician: '', message: '', priority: 'medium' });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('admin.dashboard')}</h1>
          <p className="text-muted-foreground">{t('admin.subtitle')}</p>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="text-sm text-muted-foreground">{t('admin.systemOverview')}</span>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              {t('admin.totalPopulation')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.totalPopulation.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{t('admin.acrossDivisions')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Droplets className="h-4 w-4 text-primary" />
              {t('admin.averageWQI')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.averageWQI}</div>
            <p className="text-xs text-muted-foreground">{t('admin.systemWide')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4 text-safe" />
              {t('admin.activePumps')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.activePumps}/6</div>
            <p className="text-xs text-muted-foreground">{t('admin.pumpsOperational')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-warning" />
              {t('admin.openComplaints')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.totalComplaints}</div>
            <p className="text-xs text-muted-foreground">{t('admin.pendingResolution')}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">{t('admin.overview')}</TabsTrigger>
        <TabsTrigger value="divisions">{t('admin.divisions')}</TabsTrigger>
        <TabsTrigger value="complaints">{t('admin.complaints')}</TabsTrigger>
        <TabsTrigger value="reports">{t('admin.reports')}</TabsTrigger>
      </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Critical Alerts */}
          <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-danger" />
              {t('admin.criticalAlerts')}
            </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Alert className="border-danger">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  गोपालगंज में जल गुणवत्ता असुरक्षित स्तर पर (WQI: 45) - तत्काल कार्रवाई आवश्यक
                </AlertDescription>
              </Alert>
              <Alert className="border-warning">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  मधोपुर पंप रखरखाव में - वैकल्पिक आपूर्ति व्यवस्था सक्रिय करें
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  {t('admin.systemPerformance')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall Efficiency</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Water Quality Compliance</span>
                    <span>83%</span>
                  </div>
                  <Progress value={83} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Pump Uptime</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  {t('admin.quickStats')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">{t('admin.averagePressure')}</span>
                <span className="font-medium">{systemMetrics.averagePressure} PSI</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">{t('admin.totalLeakages')}</span>
                <span className="font-medium text-danger">{systemMetrics.totalLeakages}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">{t('admin.energyEfficiency')}</span>
                <span className="font-medium text-safe">85%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">{t('admin.complaintResolution')}</span>
                <span className="font-medium">72%</span>
              </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="divisions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {divisions.map((division) => (
              <Card key={division.id} className="border-l-4 border-l-primary">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">{division.name}</CardTitle>
                    {getStatusIcon(division.status)}
                  </div>
                  <CardDescription className="text-xs">
                    Population: {division.population.toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">WQI</span>
                      <div className={`font-bold ${
                        division.wqi >= 80 ? 'text-safe' :
                        division.wqi >= 60 ? 'text-warning' : 'text-danger'
                      }`}>
                        {division.wqi}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Pump</span>
                      <div className="flex items-center gap-1">
                        <Badge 
                          variant={division.pumpMode === 'auto' ? 'default' : 'secondary'}
                          className="text-xs px-1"
                        >
                          {division.pumpMode}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status</span>
                      <div className={`font-medium ${
                        division.pumpStatus === 'running' ? 'text-safe' :
                        division.pumpStatus === 'stopped' ? 'text-warning' : 'text-danger'
                      }`}>
                        {division.pumpStatus}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Runtime</span>
                      <div className="font-medium">{division.runtime}h</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Pressure</span>
                      <div className="font-medium">{division.pressure} PSI</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Complaints</span>
                      <div className={`font-medium ${
                        division.complaints > 5 ? 'text-danger' :
                        division.complaints > 2 ? 'text-warning' : 'text-safe'
                      }`}>
                        {division.complaints}
                      </div>
                    </div>
                  </div>
                  
                  {division.leakages > 0 && (
                    <Alert className="border-warning p-2">
                      <AlertTriangle className="h-3 w-3" />
                      <AlertDescription className="text-xs">
                        {division.leakages} {t('admin.leakageDetected')}
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <Button size="sm" variant="outline" className="w-full text-xs">
                    {t('admin.viewDetails')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="complaints" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {t('admin.recentComplaints')}
              </CardTitle>
              <CardDescription>{t('admin.complaintManagement')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentComplaints.map((complaint) => (
                  <div key={complaint.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-sm">{complaint.division}</span>
                        <Badge 
                          variant="outline"
                          className={`text-xs bg-${getPriorityColor(complaint.priority)}/10 text-${getPriorityColor(complaint.priority)}`}
                        >
                          {complaint.priority}
                        </Badge>
                      </div>
                      <p className="text-sm">{complaint.issue}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {complaint.time}
                      </p>
                    </div>
                    <Badge 
                      variant={
                        complaint.status === 'resolved' ? 'default' :
                        complaint.status === 'in-progress' ? 'secondary' : 'outline'
                      }
                      className="text-xs"
                    >
                      {complaint.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Report to Technician
              </CardTitle>
              <CardDescription>तकनीशियन को निर्देश भेजें</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="technician">Technician</Label>
                <Input
                  id="technician"
                  placeholder="Select technician..."
                  value={reportForm.technician}
                  onChange={(e) => setReportForm(prev => ({ ...prev, technician: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your message or instructions..."
                  value={reportForm.message}
                  onChange={(e) => setReportForm(prev => ({ ...prev, message: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={reportForm.priority}
                  onChange={(e) => setReportForm(prev => ({ ...prev, priority: e.target.value }))}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <Button 
                onClick={sendReportToTechnician}
                disabled={!reportForm.technician || !reportForm.message}
                className="w-full"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Report
              </Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex flex-col gap-2" variant="outline">
              <BarChart3 className="h-6 w-6" />
              <span>Generate Reports</span>
            </Button>
            <Button className="h-20 flex flex-col gap-2" variant="outline">
              <TrendingUp className="h-6 w-6" />
              <span>Analytics</span>
            </Button>
            <Button className="h-20 flex flex-col gap-2" variant="outline">
              <Settings className="h-6 w-6" />
              <span>System Settings</span>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}