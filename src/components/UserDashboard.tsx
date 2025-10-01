import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { WaterChatbot } from "@/components/WaterChatbot";
import { 
  Droplets, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  FileText,
  Heart,
  Users,
  Thermometer,
  Activity
} from "lucide-react";

export function UserDashboard() {
  const divisions = [
    { id: 1, name: 'रामपुर / Rampur', wqi: 85, status: 'good', supply: 'active' },
    { id: 2, name: 'दानापुर / Danapur', wqi: 72, status: 'moderate', supply: 'active' },
    { id: 3, name: 'सागर / Sagar', wqi: 91, status: 'good', supply: 'active' },
    { id: 4, name: 'मधोपुर / Madhopur', wqi: 68, status: 'moderate', supply: 'maintenance' },
    { id: 5, name: 'गोपालगंज / Gopalganj', wqi: 45, status: 'unsafe', supply: 'active' },
    { id: 6, name: 'चंदीपुर / Chandipur', wqi: 88, status: 'good', supply: 'active' }
  ];

  const waterQuality = {
    ph: 7.2,
    turbidity: 2.1,
    dissolvedOxygen: 8.4,
    nitrate: 12.3
  };

  const healthAlerts = [
    { type: 'warning', message: 'गोपालगंज में जल गुणवत्ता खराब - उबालकर पिएं', diseases: ['दस्त', 'पेट दर्द'] },
    { type: 'info', message: 'क्षेत्र में सामान्य बुखार के मामले बढ़े हैं', diseases: ['बुखार', 'सिरदर्द'] }
  ];

  const complaints = [
    { id: 1, issue: 'पानी की आपूर्ति नहीं', status: 'pending', date: '2025-01-15' },
    { id: 2, issue: 'कम पानी का दबाव', status: 'resolved', date: '2025-01-14' },
    { id: 3, issue: 'पानी में मिट्टी', status: 'in-progress', date: '2025-01-13' }
  ];

  const getWQIColor = (wqi: number) => {
    if (wqi >= 80) return 'safe';
    if (wqi >= 60) return 'warning';
    return 'danger';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="h-4 w-4 text-safe" />;
      case 'moderate': return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'unsafe': return <AlertTriangle className="h-4 w-4 text-danger" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">नागरिक डैशबोर्ड</h1>
          <p className="text-muted-foreground">User Dashboard</p>
        </div>
        <div className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-primary" />
          <span className="text-sm text-muted-foreground">Live Status</span>
        </div>
      </div>

      {/* Health Alerts */}
      <div className="space-y-3">
        {healthAlerts.map((alert, index) => (
          <Alert key={index} className={alert.type === 'warning' ? 'border-warning' : 'border-primary'}>
            <Heart className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <div>
                <p>{alert.message}</p>
                <div className="flex gap-2 mt-1">
                  {alert.diseases.map((disease, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {disease}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button variant="outline" size="sm">
                सुझाव देखें
              </Button>
            </AlertDescription>
          </Alert>
        ))}
      </div>

      {/* Water Quality Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-primary" />
              pH Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{waterQuality.ph}</div>
            <p className="text-xs text-muted-foreground">Normal Range: 6.5-8.5</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Turbidity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{waterQuality.turbidity} NTU</div>
            <p className="text-xs text-muted-foreground">Good: &lt;5 NTU</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Droplets className="h-4 w-4 text-primary" />
              Dissolved O₂
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{waterQuality.dissolvedOxygen} mg/L</div>
            <p className="text-xs text-muted-foreground">Good: &gt;6 mg/L</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Nitrate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{waterQuality.nitrate} mg/L</div>
            <p className="text-xs text-muted-foreground">Safe: &lt;45 mg/L</p>
          </CardContent>
        </Card>
      </div>

      {/* Division Status */}
      <Card>
        <CardHeader>
          <CardTitle>क्षेत्रीय पानी की गुणवत्ता / Division Water Quality</CardTitle>
          <CardDescription>आपके क्षेत्र की live water quality index</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {divisions.map((division) => (
              <Card key={division.id} className="border-l-4 border-l-primary">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">{division.name}</CardTitle>
                    {getStatusIcon(division.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">WQI Score</span>
                      <span className={`text-sm font-bold ${
                        division.wqi >= 80 ? 'text-safe' :
                        division.wqi >= 60 ? 'text-warning' : 'text-danger'
                      }`}>
                        {division.wqi}
                      </span>
                    </div>
                    <Progress 
                      value={division.wqi} 
                      className={`h-2 ${getWQIColor(division.wqi)}`}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Supply Status</span>
                    <Badge 
                      variant={division.supply === 'active' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {division.supply === 'active' ? 'Active' : 'Maintenance'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Complaints & Community */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              मेरी शिकायतें / My Complaints
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {complaints.map((complaint) => (
              <div key={complaint.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-sm">{complaint.issue}</p>
                  <p className="text-xs text-muted-foreground">{complaint.date}</p>
                </div>
                <Badge 
                  variant={
                    complaint.status === 'resolved' ? 'default' :
                    complaint.status === 'in-progress' ? 'secondary' : 'outline'
                  }
                  className="text-xs"
                >
                  {complaint.status === 'resolved' ? 'Resolved' :
                   complaint.status === 'in-progress' ? 'In Progress' : 'Pending'}
                </Badge>
              </div>
            ))}
            <Button className="w-full" variant="outline">
              नई शिकायत दर्ज करें / Register New Complaint
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              समुदायिक स्वास्थ्य / Community Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium text-sm mb-2">क्षेत्र में फैल रही बीमारियां</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-danger rounded-full"></div>
                  <span>दस्त (15 cases)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <span>बुखार (8 cases)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>पेट दर्द (12 cases)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-safe rounded-full"></div>
                  <span>सिरदर्द (6 cases)</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                पानी शुद्धिकरण टिप्स
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                समुदायिक चैट
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Chatbot */}
      <WaterChatbot />
    </div>
  );
}