import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/components/LanguageProvider";
import { 
  Settings, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Power,
  Zap,
  Gauge,
  Droplets,
  Activity,
  Thermometer,
  Timer,
  BarChart3
} from "lucide-react";

export function TechnicianDashboard() {
  const { t } = useLanguage();
  const [pumpStates, setPumpStates] = useState({
    rampur: { mode: 'auto', status: 'running', runtime: 18.5 },
    danapur: { mode: 'manual', status: 'stopped', runtime: 12.2 },
    sagar: { mode: 'auto', status: 'running', runtime: 22.1 },
    madhopur: { mode: 'manual', status: 'maintenance', runtime: 0 },
    gopalganj: { mode: 'auto', status: 'running', runtime: 16.8 },
    chandipur: { mode: 'auto', status: 'running', runtime: 20.3 }
  });

  const sensorData = {
    ph: 7.2,
    turbidity: 2.1,
    dissolvedOxygen: 8.4,
    nitrate: 12.3,
    pressure: 45.2,
    flowRate: 125.8
  };

  const alerts = [
    { type: 'warning', message: 'गोपालगंज पंप में असामान्य कंपन', severity: 'medium', time: '10 min ago' },
    { type: 'danger', message: 'मधोपुर में दबाव कम', severity: 'high', time: '5 min ago' },
    { type: 'info', message: 'दानापुर पंप मैन्युअल मोड में', severity: 'low', time: '15 min ago' }
  ];

  const divisions = [
    { id: 'rampur', name: 'रामपुर / Rampur', wqi: 85 },
    { id: 'danapur', name: 'दानापुर / Danapur', wqi: 72 },
    { id: 'sagar', name: 'सागर / Sagar', wqi: 91 },
    { id: 'madhopur', name: 'मधोपुर / Madhopur', wqi: 68 },
    { id: 'gopalganj', name: 'गोपालगंज / Gopalganj', wqi: 45 },
    { id: 'chandipur', name: 'चंदीपुर / Chandipur', wqi: 88 }
  ];

  const togglePumpMode = (divisionId: string) => {
    setPumpStates(prev => ({
      ...prev,
      [divisionId]: {
        ...prev[divisionId as keyof typeof prev],
        mode: prev[divisionId as keyof typeof prev].mode === 'auto' ? 'manual' : 'auto'
      }
    }));
  };

  const togglePumpStatus = (divisionId: string) => {
    setPumpStates(prev => ({
      ...prev,
      [divisionId]: {
        ...prev[divisionId as keyof typeof prev],
        status: prev[divisionId as keyof typeof prev].status === 'running' ? 'stopped' : 'running'
      }
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <CheckCircle className="h-4 w-4 text-safe" />;
      case 'stopped': return <Clock className="h-4 w-4 text-warning" />;
      case 'maintenance': return <AlertTriangle className="h-4 w-4 text-danger" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'safe';
      case 'stopped': return 'warning';
      case 'maintenance': return 'danger';
      default: return 'muted';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('technician.dashboard')}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          <span className="text-sm text-muted-foreground">{t('technician.systemControl')}</span>
        </div>
      </div>

      {/* Alerts */}
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <Alert key={index} className={`border-${alert.type === 'danger' ? 'danger' : alert.type === 'warning' ? 'warning' : 'primary'}`}>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <div>
                <p>{alert.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
              </div>
                <Badge 
                  variant={alert.severity === 'high' ? 'destructive' : alert.severity === 'medium' ? 'secondary' : 'outline'}
                  className="text-xs"
                >
                  {alert.severity} {t('technician.priority')}
                </Badge>
            </AlertDescription>
          </Alert>
        ))}
      </div>

      {/* Live Sensor Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-primary" />
              {t('common.phLevel')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sensorData.ph}</div>
            <Progress value={(sensorData.ph / 14) * 100} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{t('technician.normalRange')}: 6.5-8.5</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              {t('common.turbidity')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sensorData.turbidity} NTU</div>
            <Progress value={100 - (sensorData.turbidity / 10) * 100} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{t('technician.good')}: &lt;5 NTU</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Droplets className="h-4 w-4 text-primary" />
              {t('common.dissolvedOxygen')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sensorData.dissolvedOxygen} mg/L</div>
            <Progress value={(sensorData.dissolvedOxygen / 15) * 100} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{t('technician.good')}: &gt;6 mg/L</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              {t('common.nitrate')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sensorData.nitrate} mg/L</div>
            <Progress value={(sensorData.nitrate / 45) * 100} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{t('technician.good')}: &lt;45 mg/L</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Gauge className="h-4 w-4 text-primary" />
              {t('common.pressure')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sensorData.pressure} PSI</div>
            <Progress value={(sensorData.pressure / 60) * 100} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{t('technician.normalRange')}: 30-50 PSI</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              {t('common.flowRate')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sensorData.flowRate} L/min</div>
            <Progress value={(sensorData.flowRate / 200) * 100} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{t('technician.target')}: 150 L/min</p>
          </CardContent>
        </Card>
      </div>

      {/* Pump Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Power className="h-5 w-5" />
            {t('technician.pumpControl')}
          </CardTitle>
          <CardDescription>{t('technician.pumpControlDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {divisions.map((division) => {
              const pump = pumpStates[division.id as keyof typeof pumpStates];
              return (
                <Card key={division.id} className="border-l-4 border-l-primary">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">{division.name}</CardTitle>
                      {getStatusIcon(pump.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`mode-${division.id}`} className="text-sm">
                        {t('technician.mode')}: {pump.mode === 'auto' ? t('technician.auto') : t('technician.manual')}
                      </Label>
                      <Switch
                        id={`mode-${division.id}`}
                        checked={pump.mode === 'auto'}
                        onCheckedChange={() => togglePumpMode(division.id)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{t('technician.status')}</span>
                        <Badge 
                          variant={pump.status === 'running' ? 'default' : 'secondary'}
                          className={`text-xs bg-${getStatusColor(pump.status)}/10 text-${getStatusColor(pump.status)}`}
                        >
                          {pump.status === 'running' ? t('technician.running') : pump.status === 'stopped' ? t('technician.stopped') : pump.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span>{t('technician.runtime')}</span>
                        <span className="font-medium">{pump.runtime}h</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span>{t('common.wqi')}</span>
                        <span className={`font-medium ${
                          division.wqi >= 80 ? 'text-safe' :
                          division.wqi >= 60 ? 'text-warning' : 'text-danger'
                        }`}>
                          {division.wqi}
                        </span>
                      </div>
                    </div>

                    {pump.mode === 'manual' && pump.status !== 'maintenance' && (
                      <Button
                        size="sm"
                        className="w-full"
                        variant={pump.status === 'running' ? 'destructive' : 'default'}
                        onClick={() => togglePumpStatus(division.id)}
                      >
                        {pump.status === 'running' ? (
                          <>
                            <Power className="h-4 w-4 mr-2" />
                            {t('technician.stopPump')}
                          </>
                        ) : (
                          <>
                            <Zap className="h-4 w-4 mr-2" />
                            {t('technician.startPump')}
                          </>
                        )}
                      </Button>
                    )}

                    {pump.mode === 'auto' && (
                      <div className="text-xs text-muted-foreground text-center p-2 bg-muted/50 rounded">
                        <Timer className="h-3 w-3 inline mr-1" />
                        {t('technician.autoSchedule')}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button className="h-20 flex flex-col gap-2" variant="outline">
          <Settings className="h-6 w-6" />
          <span>{t('technician.setSchedule')}</span>
        </Button>
        <Button className="h-20 flex flex-col gap-2" variant="outline">
          <BarChart3 className="h-6 w-6" />
          <span>{t('technician.viewReports')}</span>
        </Button>
        <Button className="h-20 flex flex-col gap-2" variant="outline">
          <AlertTriangle className="h-6 w-6" />
          <span>{t('technician.emergencyStop')}</span>
        </Button>
      </div>
    </div>
  );
}