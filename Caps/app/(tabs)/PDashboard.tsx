import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

// Mock database for institutional submittals
const INITIAL_LESSON_PLANS = [
  {
    id: '1',
    title: 'Grade 10 English Lit - Week 4',
    teacher: 'Mrs. Sarah Jenkins',
    status: 'Pending Review',
    dateUploaded: '2026-06-22',
    comments: [
      { id: 'c1', sender: 'Teacher', text: 'Please check the revised objective section on Page 2.', time: 'Yesterday' },
    ],
  },
  {
    id: '2',
    title: 'Advanced Algebra - Unit 3 Linear Systems',
    teacher: 'Mr. David Vance',
    status: 'Approved',
    dateUploaded: '2026-06-20',
    comments: [
      { id: 'c2', sender: 'Principal', text: 'Excellent integration of real-world scenarios.', time: '2 days ago' },
      { id: 'c3', sender: 'Teacher', text: 'Thank you, Principal! I added the recommended quiz structure.', time: '1 day ago' },
    ],
  },
  {
    id: '3',
    title: 'General Chemistry - Lab Experiment 2',
    teacher: 'Mrs. Sarah Jenkins',
    status: 'Pending Review',
    dateUploaded: '2026-06-23',
    comments: [],
  },
];

export default function AdminDashboard() {
  // Principal exact tabs: 'dashboard' | 'submissions' | 'detail'
  const [activeTab, setActiveTab] = useState('dashboard'); 
  
  // Compliance Filter State: 'All' | 'Pending Review' | 'Approved'
  const [complianceFilter, setComplianceFilter] = useState('All');
  
  const [lessonPlans, setLessonPlans] = useState(INITIAL_LESSON_PLANS);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('1');
  const [newComment, setNewComment] = useState('');

  // Filtering Logic for Submissions/Monitoring
  const filteredPlans = lessonPlans.filter((plan) => {
    if (complianceFilter === 'All') return true;
    return plan.status === complianceFilter;
  });

  const selectedPlan = lessonPlans.find((p) => p.id === selectedPlanId);

  // Leave administrative critique/feedback inside specific documents
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    setLessonPlans((prevPlans) =>
      prevPlans.map((plan) => {
        if (plan.id === selectedPlanId) {
          return {
            ...plan,
            comments: [
              ...plan.comments,
              {
                id: Math.random().toString(),
                sender: 'Principal',
                text: newComment.trim(),
                time: 'Just Now',
              },
            ],
          };
        }
        return plan;
      })
    );
    setNewComment('');
  };

  const handleJumpToComments = (id: string) => {
    setSelectedPlanId(id);
    setActiveTab('detail'); // Switches navigation focus directly to the document comments view
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      
      {/* Header Bar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>ACADOCS</Text>
          <Text style={styles.headerSubtitle}>Principal Management Suite</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace('/')}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Primary Dynamic Screen Viewport */}
      <ScrollView style={styles.scrollBody} contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        
        {/* TAB 1: DASHBOARD (STATISTICS) */}
        {activeTab === 'dashboard' && (
          <View>
            <Text style={styles.sectionHeading}>Institutional KPIs</Text>
            
            {/* Student Population & Survival/Dropout Card */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Student Cohort Analytics</Text>
              <View style={styles.metricRow}>
                <View style={styles.metricBlock}>
                  <Text style={styles.metricNumber}>1,482</Text>
                  <Text style={styles.metricLabel}>Total Enrollment</Text>
                </View>
                <View style={styles.metricDivider} />
                <View style={styles.metricBlock}>
                  <Text style={[styles.metricNumber, { color: '#2E7D32' }]}>94.2%</Text>
                  <Text style={styles.metricLabel}>Survival Rate</Text>
                </View>
                <View style={styles.metricDivider} />
                <View style={styles.metricBlock}>
                  <Text style={[styles.metricNumber, { color: MAROON }]}>5.8%</Text>
                  <Text style={styles.metricLabel}>Dropout Rate</Text>
                </View>
              </View>
              
              {/* Reference chart wireframe */}
              <View style={styles.chartWireframe}>
                <View style={[styles.bar, { height: 60 }]} />
                <View style={[styles.bar, { height: 90 }]} />
                <View style={[styles.bar, { height: 110 }]} />
                <View style={[styles.bar, { height: 130 }]} />
              </View>
              <Text style={styles.chartCaption}>Year-over-Year Cohort Retention</Text>
            </View>

            {/* Performance Card */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>School Performance Metrics</Text>
              <View style={styles.progressContainer}>
                <View style={styles.progressTextRow}>
                  <Text style={styles.progressLabel}>Lesson Plan Compliance Index</Text>
                  <Text style={styles.progressPercent}>88%</Text>
                </View>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: '88%' }]} />
                </View>
              </View>

              <View style={[styles.progressContainer, { marginTop: 16 }]}>
                <View style={styles.progressTextRow}>
                  <Text style={styles.progressLabel}>Quarterly Syllabus Grading Pace</Text>
                  <Text style={styles.progressPercent}>65%</Text>
                </View>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: '65%', backgroundColor: '#D1A3A3' }]} />
                </View>
              </View>
            </View>
          </View>
        )}

        {/* TAB 2: SUBMISSIONS & MONITORING (WITH COMPLIANCE FILTERS) */}
        {activeTab === 'submissions' && (
          <View>
            <Text style={styles.sectionHeading}>Syllabus Monitoring Hub</Text>
            
            {/* Compliance Filter Matrix Row */}
            <View style={styles.filterContainer}>
              {['All', 'Pending Review', 'Approved'].map((filterOption) => (
                <TouchableOpacity
                  key={filterOption}
                  style={[
                    styles.filterButton,
                    complianceFilter === filterOption && styles.filterButtonActive,
                  ]}
                  onPress={() => setComplianceFilter(filterOption)}
                >
                  <Text
                    style={[
                      styles.filterButtonText,
                      complianceFilter === filterOption && styles.filterButtonTextActive,
                    ]}
                  >
                    {filterOption === 'All' ? 'All Docs' : filterOption}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Monitored Documents Grid List */}
            <View style={styles.card}>
              <Text style={styles.cardSubTitle}>Faculty Submissions ({filteredPlans.length})</Text>
              {filteredPlans.length === 0 ? (
                <Text style={styles.emptyText}>No matching compliance records discovered.</Text>
              ) : (
                filteredPlans.map((plan) => (
                  <View key={plan.id} style={styles.docItem}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.docTitle}>{plan.title}</Text>
                      <Text style={styles.docMeta}>Uploaded by {plan.teacher} • {plan.dateUploaded}</Text>
                    </View>
                    <View style={styles.actionColumn}>
                      <View style={[styles.statusBadge, plan.status === 'Approved' ? styles.statusApproved : styles.statusPending]}>
                        <Text style={styles.statusText}>{plan.status}</Text>
                      </View>
                      <TouchableOpacity style={styles.reviewLink} onPress={() => handleJumpToComments(plan.id)}>
                        <Text style={styles.reviewLinkText}>Open Review 💬</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              )}
            </View>
          </View>
        )}

        {/* TAB 3: DOCUMENT DETAIL (COMMENTS) */}
        {activeTab === 'detail' && (
          <View>
            <Text style={styles.sectionHeading}>Document Analysis Desk</Text>
            
            {selectedPlan ? (
              <View>
                {/* Meta Summary Card */}
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>{selectedPlan.title}</Text>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Author Faculty:</Text>
                    <Text style={styles.detailValue}>{selectedPlan.teacher}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Receipt Date:</Text>
                    <Text style={styles.detailValue}>{selectedPlan.dateUploaded}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Review Status:</Text>
                    <Text style={[styles.detailValue, { fontWeight: '700', color: selectedPlan.status === 'Approved' ? '#2E7D32' : MAROON }]}>
                      {selectedPlan.status}
                    </Text>
                  </View>
                </View>

                {/* Private Feedback Comments */}
                <View style={styles.card}>
                  <Text style={styles.cardSubTitle}>Private Administrative Critique Thread</Text>
                  
                  <View style={styles.commentThreadBox}>
                    {selectedPlan.comments.length === 0 ? (
                      <Text style={styles.emptyText}>No evaluation comments logged. Start the dialogue below.</Text>
                    ) : (
                      selectedPlan.comments.map((comment) => (
                        <View
                          key={comment.id}
                          style={[
                            styles.chatBubble,
                            comment.sender === 'Principal' ? styles.chatBubblePrincipal : styles.chatBubbleTeacher,
                          ]}
                        >
                          <Text style={styles.chatSender}>{comment.sender}</Text>
                          <Text style={styles.chatText}>{comment.text}</Text>
                          <Text style={styles.chatTime}>{comment.time}</Text>
                        </View>
                      ))
                    )}
                  </View>

                  {/* Comment Insertion Input */}
                  <View style={styles.inputActionContainer}>
                    <TextInput
                      style={styles.cardInput}
                      placeholder="Type private correction or guidance notes..."
                      value={newComment}
                      onChangeText={setNewComment}
                    />
                    <TouchableOpacity style={styles.postCommentButton} onPress={handleAddComment}>
                      <Text style={styles.postCommentButtonText}>Post</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.card}>
                <Text style={styles.emptyText}>No document has been isolated for active review yet. Visit the Submissions panel.</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Tailored Bottom Tab Matrix Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('dashboard')}>
          <Text style={[styles.navIconText, activeTab === 'dashboard' && styles.navTextActive]}>📊</Text>
          <Text style={[styles.navLabel, activeTab === 'dashboard' && styles.navTextActive]}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('submissions')}>
          <Text style={[styles.navIconText, activeTab === 'submissions' && styles.navTextActive]}>📋</Text>
          <Text style={[styles.navLabel, activeTab === 'submissions' && styles.navTextActive]}>Monitoring</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('detail')}>
          <Text style={[styles.navIconText, activeTab === 'detail' && styles.navTextActive]}>💬</Text>
          <Text style={[styles.navLabel, activeTab === 'detail' && styles.navTextActive]}>Doc Comments</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
}

const MAROON = '#800000';
const WHITE = '#FFFFFF';
const SYSTEM_GREY = '#F4F5F7';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SYSTEM_GREY,
  },
  header: {
    backgroundColor: MAROON,
    paddingTop: Platform.OS === 'ios' ? 54 : 36,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  headerLeft: {
    flexDirection: 'column',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: WHITE,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#D1A3A3',
    fontWeight: '500',
    marginTop: 2,
  },
  logoutButton: {
    position: 'absolute',
    right: 20,
    bottom: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  logoutText: {
    color: WHITE,
    fontSize: 12,
    fontWeight: '600',
  },
  scrollBody: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginTop: 20,
    marginBottom: 12,
  },
  card: {
    backgroundColor: WHITE,
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: MAROON,
    marginBottom: 14,
  },
  cardSubTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  metricBlock: {
    flex: 1,
    alignItems: 'center',
  },
  metricNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },
  metricLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
    textAlign: 'center',
  },
  metricDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E0E0E0',
  },
  chartWireframe: {
    height: 120,
    backgroundColor: '#FAF7F7',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: '#EAE2E2',
  },
  bar: {
    width: 28,
    backgroundColor: MAROON,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    opacity: 0.85,
  },
  chartCaption: {
    textAlign: 'center',
    fontSize: 11,
    color: '#999',
    marginTop: 8,
  },
  progressContainer: {
    width: '100%',
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 13,
    color: '#444',
  },
  progressPercent: {
    fontSize: 13,
    fontWeight: '600',
    color: MAROON,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#EAE2E2',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: MAROON,
    borderRadius: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
  },
  filterButton: {
    backgroundColor: WHITE,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterButtonActive: {
    backgroundColor: MAROON,
    borderColor: MAROON,
  },
  filterButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: WHITE,
    fontWeight: '600',
  },
  docItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  docTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  docMeta: {
    fontSize: 11,
    color: '#777',
    marginTop: 2,
  },
  actionColumn: {
    alignItems: 'flex-end',
    gap: 6,
  },
  statusBadge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusPending: {
    backgroundColor: '#FFF3E0',
  },
  statusApproved: {
    backgroundColor: '#E8F5E9',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#555',
  },
  reviewLink: {
    paddingVertical: 2,
  },
  reviewLinkText: {
    fontSize: 12,
    color: MAROON,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#FAFAFA',
  },
  detailLabel: {
    fontSize: 13,
    color: '#666',
  },
  detailValue: {
    fontSize: 13,
    color: '#222',
    fontWeight: '500',
  },
  commentThreadBox: {
    maxHeight: 220,
    backgroundColor: '#FDFBFB',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#F2ECEB',
    marginBottom: 12,
  },
  chatBubble: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: '85%',
  },
  chatBubblePrincipal: {
    backgroundColor: '#FFF0F0',
    borderColor: '#F4DCDA',
    borderWidth: 1,
    alignSelf: 'flex-end',
  },
  chatBubbleTeacher: {
    backgroundColor: '#ECEFF1',
    alignSelf: 'flex-start',
  },
  chatSender: {
    fontSize: 11,
    fontWeight: '700',
    color: '#555',
    marginBottom: 2,
  },
  chatText: {
    fontSize: 13,
    color: '#222',
  },
  chatTime: {
    fontSize: 9,
    color: '#999',
    textAlign: 'right',
    marginTop: 4,
  },
  emptyText: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    paddingVertical: 20,
  },
  inputActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardInput: {
    flex: 1,
    height: 40,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FAFAFA',
    fontSize: 14,
  },
  postCommentButton: {
    backgroundColor: MAROON,
    paddingHorizontal: 16,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 8,
  },
  postCommentButtonText: {
    color: WHITE,
    fontSize: 13,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingBottom: Platform.OS === 'ios' ? 24 : 10,
    paddingTop: 10,
    justifyContent: 'space-around',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navIconText: {
    fontSize: 20,
    color: '#888',
  },
  navLabel: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
  navTextActive: {
    color: MAROON,
    fontWeight: '600',
  },
});
