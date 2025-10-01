import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/components/LanguageProvider";
import { 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  FileText,
  Droplets,
  Activity,
  IndianRupee,
  TrendingUp,
  Calendar,
  MapPin,
  Bell
} from "lucide-react";

export function VWSCDashboard() {
  const { t, language } = useLanguage();
  const villageInfo = {
    name: 'रामपुर',
    nameEn: 'Rampur',
    population: 1245,
    households: 287,
    wqi: 85
  };

  const waterSupply = {
    morningSlot: '6:00 AM - 8:00 AM',
    eveningSlot: '5:00 PM - 7:00 PM',
    status: 'active',
    todaySupply: 95
  };

  const finances = {
    monthlyCollection: 45800,
    expenses: 32400,
    balance: 125600,
    pendingPayments: 18
  };

  const complaints = [
    { id: 1, household: 'घर #45', issue: 'पानी की आपूर्ति नहीं', status: 'pending', priority: 'high', date: '2025-01-15' },
    { id: 2, household: 'घर #123', issue: 'कम पानी का दबाव', status: 'in-progress', priority: 'medium', date: '2025-01-14' },
    { id: 3, household: 'घर #89', issue: 'पानी में मिट्टी', status: 'resolved', priority: 'high', date: '2025-01-13' }
  ];

  const meetings = [
    { date: '2025-01-20', topic: 'मासिक समीक्षा बैठक', time: '10:00 AM', attendees: 12 },
    { date: '2025-01-25', topic: 'पंप मेंटेनेंस योजना', time: '2:00 PM', attendees: 8 }
  ];

  const members = [
    { name: 'राजेश कुमार', role: 'अध्यक्ष', phone: '98XXX-XXXXX' },
    { name: 'सुनीता देवी', role: 'सचिव', phone: '97XXX-XXXXX' },
    { name: 'रामप्रसाद', role: 'कोषाध्यक्ष', phone: '96XXX-XXXXX' },
    { name: 'अनिता शर्मा', role: 'सदस्य', phone: '95XXX-XXXXX' }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('vwsc.dashboard')}</h1>
          <p className="text-muted-foreground">{t('vwsc.committee')}</p>
          <div className="flex items-center gap-2 mt-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-medium">{villageInfo.name} / {villageInfo.nameEn}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">{t('vwsc.population')}</div>
          <div className="text-2xl font-bold">{villageInfo.population}</div>
          <div className="text-xs text-muted-foreground">{villageInfo.households} {t('vwsc.households')}</div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Droplets className="h-4 w-4 text-primary" />
              {t('common.wqi')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{villageInfo.wqi}</div>
            <Progress value={villageInfo.wqi} className="h-2 mt-2" />
            <p className="text-xs text-safe mt-1">{t('vwsc.goodQuality')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4 text-safe" />
              {t('vwsc.todaySupply')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{waterSupply.todaySupply}%</div>
            <Progress value={waterSupply.todaySupply} className="h-2 mt-2 safe" />
            <p className="text-xs text-muted-foreground mt-1">{waterSupply.status === 'active' ? t('user.active') : 'Inactive'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <IndianRupee className="h-4 w-4 text-primary" />
              {t('vwsc.monthlyCollection')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(finances.monthlyCollection / 1000).toFixed(1)}k</div>
            <p className="text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 inline text-safe" /> +12% {t('vwsc.fromLastMonth')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Bell className="h-4 w-4 text-warning" />
              {t('vwsc.pendingComplaints')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {complaints.filter(c => c.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{t('vwsc.totalComplaints')} {complaints.length} {t('vwsc.complaints')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Water Supply Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {t('vwsc.waterSchedule')}
          </CardTitle>
          <CardDescription>{t('vwsc.scheduleDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-primary/10 text-primary">{t('vwsc.morning')}</Badge>
                <CheckCircle className="h-4 w-4 text-safe" />
              </div>
              <div className="text-lg font-semibold">{waterSupply.morningSlot}</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-primary/10 text-primary">{t('vwsc.evening')}</Badge>
                <CheckCircle className="h-4 w-4 text-safe" />
              </div>
              <div className="text-lg font-semibold">{waterSupply.eveningSlot}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Complaints & Financials */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Complaints */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {t('vwsc.complaintsTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {complaints.map((complaint) => (
              <div key={complaint.id} className="flex items-start justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{complaint.household}</span>
                    <Badge 
                      variant={complaint.priority === 'high' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {complaint.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{complaint.issue}</p>
                  <p className="text-xs text-muted-foreground mt-1">{complaint.date}</p>
                </div>
                <Badge 
                  variant={
                    complaint.status === 'resolved' ? 'default' :
                    complaint.status === 'in-progress' ? 'secondary' : 'outline'
                  }
                  className="text-xs"
                >
                  {complaint.status === 'resolved' ? t('user.resolved') :
                   complaint.status === 'in-progress' ? t('user.inProgress') : t('user.pending')}
                </Badge>
              </div>
            ))}
            <Button className="w-full" variant="outline">
              {t('vwsc.viewAll')}
            </Button>
          </CardContent>
        </Card>

        {/* Financial Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IndianRupee className="h-5 w-5" />
              {t('vwsc.financialSummary')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-safe/10 rounded-lg">
                <span className="text-sm">{t('vwsc.monthlyCollection')}</span>
                <span className="font-bold text-safe">₹{finances.monthlyCollection.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                <span className="text-sm">{t('vwsc.monthlyExpense')}</span>
                <span className="font-bold text-warning">₹{finances.expenses.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                <span className="text-sm">{t('vwsc.totalBalance')}</span>
                <span className="font-bold text-primary">₹{finances.balance.toLocaleString()}</span>
              </div>
            </div>
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <span className="font-medium">{finances.pendingPayments} {t('vwsc.pendingPayments')}</span>
              </AlertDescription>
            </Alert>
            <Button className="w-full water-gradient text-white">
              {t('vwsc.viewReport')}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Committee Members & Meetings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Committee Members */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              {t('vwsc.committeeMembers')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {members.map((member, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
                <span className="text-xs text-muted-foreground">{member.phone}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Meetings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {t('vwsc.upcomingMeetings')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {meetings.map((meeting, idx) => (
              <div key={idx} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{meeting.date}</Badge>
                  <span className="text-sm text-muted-foreground">{meeting.time}</span>
                </div>
                <p className="font-medium mb-1">{meeting.topic}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  {meeting.attendees} {t('vwsc.membersInvited')}
                </div>
              </div>
            ))}
            <Button className="w-full" variant="outline">
              {t('vwsc.scheduleMeeting')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
