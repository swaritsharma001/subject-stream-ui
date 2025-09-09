// API placeholder functions for future Supabase integration

export interface School {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Class {
  id: string;
  schoolId: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Subject {
  id: string;
  classId: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Chapter {
  id: string;
  subjectId: string;
  name: string;
  description?: string;
  pdfFile?: File;
  pdfUrl?: string;
  isLocked: boolean;
  price: number;
  passKey?: string;
  isActive: boolean;
  createdAt: string;
}

export interface PassKey {
  id: string;
  key: string;
  type: 'single' | 'quota';
  chapterId?: string; // for single use
  quota?: number; // for quota-based
  usedCount: number;
  isActive: boolean;
  expiresAt?: string;
  createdAt: string;
}

export interface PaymentQR {
  id: string;
  imageFile?: File;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
}

export interface SiteSettings {
  websiteName: string;
  logoUrl?: string;
  footerText: string;
  announcementText: string;
  contactNumbers: string[];
  privacyPolicy: string;
  termsOfService: string;
}

// Placeholder API functions - will be replaced with Supabase calls
export const api = {
  // Schools
  fetchSchools: async (): Promise<School[]> => {
    // Mock data for development
    return [
      {
        id: '1',
        name: 'St. Mary\'s High School',
        description: 'Premier educational institution',
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Green Valley Academy',
        description: 'Modern learning environment',
        isActive: true,
        createdAt: new Date().toISOString(),
      },
    ];
  },

  createSchool: async (school: Omit<School, 'id' | 'createdAt'>): Promise<School> => {
    console.log('Creating school:', school);
    return { ...school, id: Date.now().toString(), createdAt: new Date().toISOString() };
  },

  updateSchool: async (id: string, school: Partial<School>): Promise<School> => {
    console.log('Updating school:', id, school);
    return { ...school, id, createdAt: new Date().toISOString() } as School;
  },

  deleteSchool: async (id: string): Promise<void> => {
    console.log('Deleting school:', id);
  },

  // Classes
  fetchClasses: async (schoolId: string): Promise<Class[]> => {
    return [
      {
        id: '1',
        schoolId,
        name: 'Class 10',
        description: 'Secondary education',
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        schoolId,
        name: 'Class 12',
        description: 'Higher secondary education',
        isActive: true,
        createdAt: new Date().toISOString(),
      },
    ];
  },

  createClass: async (classData: Omit<Class, 'id' | 'createdAt'>): Promise<Class> => {
    console.log('Creating class:', classData);
    return { ...classData, id: Date.now().toString(), createdAt: new Date().toISOString() };
  },

  updateClass: async (id: string, classData: Partial<Class>): Promise<Class> => {
    console.log('Updating class:', id, classData);
    return { ...classData, id, createdAt: new Date().toISOString() } as Class;
  },

  deleteClass: async (id: string): Promise<void> => {
    console.log('Deleting class:', id);
  },

  // Subjects
  fetchSubjects: async (classId: string): Promise<Subject[]> => {
    return [
      {
        id: '1',
        classId,
        name: 'Mathematics',
        description: 'Advanced mathematics concepts',
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        classId,
        name: 'Physics',
        description: 'Fundamental physics principles',
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        classId,
        name: 'Chemistry',
        description: 'Chemical reactions and elements',
        isActive: true,
        createdAt: new Date().toISOString(),
      },
    ];
  },

  createSubject: async (subject: Omit<Subject, 'id' | 'createdAt'>): Promise<Subject> => {
    console.log('Creating subject:', subject);
    return { ...subject, id: Date.now().toString(), createdAt: new Date().toISOString() };
  },

  updateSubject: async (id: string, subject: Partial<Subject>): Promise<Subject> => {
    console.log('Updating subject:', id, subject);
    return { ...subject, id, createdAt: new Date().toISOString() } as Subject;
  },

  deleteSubject: async (id: string): Promise<void> => {
    console.log('Deleting subject:', id);
  },

  // Chapters
  fetchChapters: async (subjectId: string): Promise<Chapter[]> => {
    return [
      {
        id: '1',
        subjectId,
        name: 'Introduction to Algebra',
        description: 'Basic algebraic concepts and equations',
        isLocked: false,
        price: 10,
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        subjectId,
        name: 'Quadratic Equations',
        description: 'Solving quadratic equations using various methods',
        isLocked: true,
        price: 10,
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        subjectId,
        name: 'Coordinate Geometry',
        description: 'Points, lines, and shapes in coordinate plane',
        isLocked: true,
        price: 10,
        isActive: true,
        createdAt: new Date().toISOString(),
      },
    ];
  },

  createChapter: async (chapter: Omit<Chapter, 'id' | 'createdAt'>): Promise<Chapter> => {
    console.log('Creating chapter:', chapter);
    return { ...chapter, id: Date.now().toString(), createdAt: new Date().toISOString() };
  },

  updateChapter: async (id: string, chapter: Partial<Chapter>): Promise<Chapter> => {
    console.log('Updating chapter:', id, chapter);
    return { ...chapter, id, createdAt: new Date().toISOString() } as Chapter;
  },

  deleteChapter: async (id: string): Promise<void> => {
    console.log('Deleting chapter:', id);
  },

  uploadPDF: async (file: File): Promise<string> => {
    console.log('Uploading PDF:', file.name);
    // Mock URL - will be replaced with Supabase storage
    return URL.createObjectURL(file);
  },

  // Pass Keys
  fetchPassKeys: async (): Promise<PassKey[]> => {
    return [
      {
        id: '1',
        key: 'MATH001',
        type: 'single',
        chapterId: '1',
        usedCount: 0,
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        key: 'ALLACCESS10',
        type: 'quota',
        quota: 10,
        usedCount: 3,
        isActive: true,
        createdAt: new Date().toISOString(),
      },
    ];
  },

  createPassKey: async (passKey: Omit<PassKey, 'id' | 'createdAt' | 'usedCount'>): Promise<PassKey> => {
    console.log('Creating pass key:', passKey);
    return { ...passKey, id: Date.now().toString(), usedCount: 0, createdAt: new Date().toISOString() };
  },

  validatePassKey: async (key: string, chapterId: string): Promise<boolean> => {
    console.log('Validating pass key:', key, 'for chapter:', chapterId);
    // Mock validation
    return key === 'VALID123' || key === 'MATH001';
  },

  usePassKey: async (keyId: string): Promise<void> => {
    console.log('Using pass key:', keyId);
  },

  // Payment QR
  fetchPaymentQR: async (): Promise<PaymentQR | null> => {
    return {
      id: '1',
      imageUrl: '/placeholder-qr.png',
      isActive: true,
      createdAt: new Date().toISOString(),
    };
  },

  uploadQRCode: async (file: File): Promise<string> => {
    console.log('Uploading QR code:', file.name);
    return URL.createObjectURL(file);
  },

  // Site Settings
  fetchSiteSettings: async (): Promise<SiteSettings> => {
    return {
      websiteName: 'EduPortal',
      logoUrl: '/logo.png',
      footerText: '© 2024 EduPortal. All rights reserved.',
      announcementText: 'Welcome to our educational platform! 📚 New content available now.',
      contactNumbers: ['+91 98765 43210', '+91 87654 32109'],
      privacyPolicy: 'Our privacy policy ensures your data is protected...',
      termsOfService: 'By using our service, you agree to these terms...',
    };
  },

  updateSiteSettings: async (settings: Partial<SiteSettings>): Promise<SiteSettings> => {
    console.log('Updating site settings:', settings);
    return { ...settings } as SiteSettings;
  },

  uploadLogo: async (file: File): Promise<string> => {
    console.log('Uploading logo:', file.name);
    return URL.createObjectURL(file);
  },
};