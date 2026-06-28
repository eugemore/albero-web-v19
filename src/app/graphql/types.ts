export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  expiresAt: Scalars['Float']['output'];
  idToken: Scalars['String']['output'];
};

export type CiudadaniaDocument = {
  __typename?: 'CiudadaniaDocument';
  _id: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  issueDate?: Maybe<Scalars['String']['output']>;
  issuingAuthority?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  owner: Scalars['ID']['output'];
  person: Scalars['ID']['output'];
  referenceNumber?: Maybe<Scalars['String']['output']>;
  status: DocumentStatus;
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CreateDocumentInput = {
  issueDate?: InputMaybe<Scalars['String']['input']>;
  issuingAuthority?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  personId: Scalars['ID']['input'];
  referenceNumber?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<DocumentStatus>;
  type: Scalars['String']['input'];
};

export type CreateFamilyInput = {
  name: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePersonInput = {
  dateOfBirth?: InputMaybe<Scalars['String']['input']>;
  familyId: Scalars['ID']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
  placeOfBirth?: InputMaybe<Scalars['String']['input']>;
};

/** Current status of a citizenship document. */
export enum DocumentStatus {
  /** Accepted — document has been approved. */
  Aceptado = 'ACEPTADO',
  /** Not accepted — document was rejected or requires correction. */
  NoAceptado = 'NO_ACEPTADO',
  /** Pending — document not yet submitted or under review. */
  Pendiente = 'PENDIENTE'
}

export type Family = {
  __typename?: 'Family';
  _id: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  owner: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createDocument: CiudadaniaDocument;
  createFamily: Family;
  createPerson: Person;
  login: AuthResponse;
  register: Scalars['String']['output'];
  removeDocument: Scalars['ID']['output'];
  removeFamily: Scalars['ID']['output'];
  removePerson: Scalars['ID']['output'];
  updateDocument: CiudadaniaDocument;
  updateFamily: Family;
  updatePerson: Person;
  verifyEmail: Scalars['String']['output'];
};


export type MutationCreateDocumentArgs = {
  input: CreateDocumentInput;
};


export type MutationCreateFamilyArgs = {
  input: CreateFamilyInput;
};


export type MutationCreatePersonArgs = {
  input: CreatePersonInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRemoveDocumentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveFamilyArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemovePersonArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateDocumentArgs = {
  input: UpdateDocumentInput;
};


export type MutationUpdateFamilyArgs = {
  input: UpdateFamilyInput;
};


export type MutationUpdatePersonArgs = {
  input: UpdatePersonInput;
};


export type MutationVerifyEmailArgs = {
  code: Scalars['String']['input'];
};

export type Person = {
  __typename?: 'Person';
  _id: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dateOfBirth?: Maybe<Scalars['String']['output']>;
  family: Scalars['ID']['output'];
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  owner: Scalars['ID']['output'];
  parent?: Maybe<Scalars['ID']['output']>;
  placeOfBirth?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Query = {
  __typename?: 'Query';
  document: CiudadaniaDocument;
  documentsByPerson: Array<CiudadaniaDocument>;
  documentsByStatus: Array<CiudadaniaDocument>;
  families: Array<Family>;
  family: Family;
  me: User;
  person: Person;
  personsByFamily: Array<Person>;
};


export type QueryDocumentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDocumentsByPersonArgs = {
  personId: Scalars['ID']['input'];
};


export type QueryDocumentsByStatusArgs = {
  status: DocumentStatus;
};


export type QueryFamilyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPersonArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPersonsByFamilyArgs = {
  familyId: Scalars['ID']['input'];
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UpdateDocumentInput = {
  id: Scalars['ID']['input'];
  issueDate?: InputMaybe<Scalars['String']['input']>;
  issuingAuthority?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  referenceNumber?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<DocumentStatus>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateFamilyInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePersonInput = {
  dateOfBirth?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
  placeOfBirth?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  active: Scalars['Boolean']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
};
