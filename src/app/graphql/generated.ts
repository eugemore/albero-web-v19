/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type CreateDocumentInput = {
  issueDate?: string | null | undefined;
  issuingAuthority?: string | null | undefined;
  notes?: string | null | undefined;
  personId: string;
  referenceNumber?: string | null | undefined;
  status?: DocumentStatus | null | undefined;
  type: string;
};

export type CreateFamilyInput = {
  name: string;
  notes?: string | null | undefined;
};

export type CreatePersonInput = {
  dateOfBirth?: string | null | undefined;
  familyId: string;
  firstName: string;
  lastName: string;
  notes?: string | null | undefined;
  parentId?: string | null | undefined;
  placeOfBirth?: string | null | undefined;
};

/** Current status of a citizenship document. */
export type DocumentStatus =
  /** Accepted — document has been approved. */
  | 'ACEPTADO'
  /** Not accepted — document was rejected or requires correction. */
  | 'NO_ACEPTADO'
  /** Pending — document not yet submitted or under review. */
  | 'PENDIENTE';

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  email: string;
  password: string;
};

export type UpdateDocumentInput = {
  id: string;
  issueDate?: string | null | undefined;
  issuingAuthority?: string | null | undefined;
  notes?: string | null | undefined;
  referenceNumber?: string | null | undefined;
  status?: DocumentStatus | null | undefined;
  type?: string | null | undefined;
};

export type UpdateFamilyInput = {
  id: string;
  name?: string | null | undefined;
  notes?: string | null | undefined;
};

export type UpdatePersonInput = {
  dateOfBirth?: string | null | undefined;
  firstName?: string | null | undefined;
  id: string;
  lastName?: string | null | undefined;
  notes?: string | null | undefined;
  parentId?: string | null | undefined;
  placeOfBirth?: string | null | undefined;
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { login: { idToken: string, expiresAt: number } };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { register: string };

export type VerifyEmailMutationVariables = Exact<{
  code: string;
}>;


export type VerifyEmailMutation = { verifyEmail: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { me: { _id: string, email: string, active: boolean } };

export type DocumentsByPersonQueryVariables = Exact<{
  personId: string;
}>;


export type DocumentsByPersonQuery = { documentsByPerson: Array<{ _id: string, type: string, person: string, status: DocumentStatus, issuingAuthority: string | null, issueDate: string | null, referenceNumber: string | null, notes: string | null, createdAt: string | null, updatedAt: string | null }> };

export type DocumentsByStatusQueryVariables = Exact<{
  status: DocumentStatus;
}>;


export type DocumentsByStatusQuery = { documentsByStatus: Array<{ _id: string, type: string, person: string, status: DocumentStatus, issuingAuthority: string | null, issueDate: string | null, referenceNumber: string | null, notes: string | null }> };

export type CreateDocumentMutationVariables = Exact<{
  input: CreateDocumentInput;
}>;


export type CreateDocumentMutation = { createDocument: { _id: string, type: string, person: string, status: DocumentStatus, issuingAuthority: string | null, issueDate: string | null, referenceNumber: string | null, notes: string | null, owner: string } };

export type UpdateDocumentMutationVariables = Exact<{
  input: UpdateDocumentInput;
}>;


export type UpdateDocumentMutation = { updateDocument: { _id: string, type: string, status: DocumentStatus, issuingAuthority: string | null, issueDate: string | null, referenceNumber: string | null, notes: string | null, updatedAt: string | null } };

export type RemoveDocumentMutationVariables = Exact<{
  id: string;
}>;


export type RemoveDocumentMutation = { removeDocument: string };

export type FamiliesQueryVariables = Exact<{ [key: string]: never; }>;


export type FamiliesQuery = { families: Array<{ _id: string, name: string, notes: string | null, owner: string, createdAt: string | null, updatedAt: string | null }> };

export type FamilyQueryVariables = Exact<{
  id: string;
}>;


export type FamilyQuery = { family: { _id: string, name: string, notes: string | null, owner: string, createdAt: string | null, updatedAt: string | null } };

export type CreateFamilyMutationVariables = Exact<{
  input: CreateFamilyInput;
}>;


export type CreateFamilyMutation = { createFamily: { _id: string, name: string, notes: string | null, createdAt: string | null } };

export type UpdateFamilyMutationVariables = Exact<{
  input: UpdateFamilyInput;
}>;


export type UpdateFamilyMutation = { updateFamily: { _id: string, name: string, notes: string | null, updatedAt: string | null } };

export type RemoveFamilyMutationVariables = Exact<{
  id: string;
}>;


export type RemoveFamilyMutation = { removeFamily: string };

export type PersonsByFamilyQueryVariables = Exact<{
  familyId: string;
}>;


export type PersonsByFamilyQuery = { personsByFamily: Array<{ _id: string, firstName: string, lastName: string, dateOfBirth: string | null, placeOfBirth: string | null, notes: string | null, family: string, parent: string | null, createdAt: string | null, updatedAt: string | null }> };

export type PersonQueryVariables = Exact<{
  id: string;
}>;


export type PersonQuery = { person: { _id: string, firstName: string, lastName: string, dateOfBirth: string | null, placeOfBirth: string | null, notes: string | null, family: string, parent: string | null, createdAt: string | null, updatedAt: string | null } };

export type CreatePersonMutationVariables = Exact<{
  input: CreatePersonInput;
}>;


export type CreatePersonMutation = { createPerson: { _id: string, firstName: string, lastName: string, dateOfBirth: string | null, placeOfBirth: string | null, notes: string | null, family: string, parent: string | null, createdAt: string | null, updatedAt: string | null } };

export type UpdatePersonMutationVariables = Exact<{
  input: UpdatePersonInput;
}>;


export type UpdatePersonMutation = { updatePerson: { _id: string, firstName: string, lastName: string, dateOfBirth: string | null, placeOfBirth: string | null, notes: string | null, family: string, parent: string | null, createdAt: string | null, updatedAt: string | null } };

export type RemovePersonMutationVariables = Exact<{
  id: string;
}>;


export type RemovePersonMutation = { removePerson: string };

export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    idToken
    expiresAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Mutation<LoginMutation, LoginMutationVariables> {
    override document = LoginDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RegisterDocument = gql`
    mutation Register($input: RegisterInput!) {
  register(input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RegisterGQL extends Apollo.Mutation<RegisterMutation, RegisterMutationVariables> {
    override document = RegisterDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const VerifyEmailDocument = gql`
    mutation VerifyEmail($code: String!) {
  verifyEmail(code: $code)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class VerifyEmailGQL extends Apollo.Mutation<VerifyEmailMutation, VerifyEmailMutationVariables> {
    override document = VerifyEmailDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const MeDocument = gql`
    query Me {
  me {
    _id
    email
    active
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class MeGQL extends Apollo.Query<MeQuery, MeQueryVariables> {
    override document = MeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DocumentsByPersonDocument = gql`
    query DocumentsByPerson($personId: ID!) {
  documentsByPerson(personId: $personId) {
    _id
    type
    person
    status
    issuingAuthority
    issueDate
    referenceNumber
    notes
    createdAt
    updatedAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DocumentsByPersonGQL extends Apollo.Query<DocumentsByPersonQuery, DocumentsByPersonQueryVariables> {
    override document = DocumentsByPersonDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DocumentsByStatusDocument = gql`
    query DocumentsByStatus($status: DocumentStatus!) {
  documentsByStatus(status: $status) {
    _id
    type
    person
    status
    issuingAuthority
    issueDate
    referenceNumber
    notes
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DocumentsByStatusGQL extends Apollo.Query<DocumentsByStatusQuery, DocumentsByStatusQueryVariables> {
    override document = DocumentsByStatusDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateDocumentDocument = gql`
    mutation CreateDocument($input: CreateDocumentInput!) {
  createDocument(input: $input) {
    _id
    type
    person
    status
    issuingAuthority
    issueDate
    referenceNumber
    notes
    owner
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateDocumentGQL extends Apollo.Mutation<CreateDocumentMutation, CreateDocumentMutationVariables> {
    override document = CreateDocumentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateDocumentDocument = gql`
    mutation UpdateDocument($input: UpdateDocumentInput!) {
  updateDocument(input: $input) {
    _id
    type
    status
    issuingAuthority
    issueDate
    referenceNumber
    notes
    updatedAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateDocumentGQL extends Apollo.Mutation<UpdateDocumentMutation, UpdateDocumentMutationVariables> {
    override document = UpdateDocumentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RemoveDocumentDocument = gql`
    mutation RemoveDocument($id: ID!) {
  removeDocument(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RemoveDocumentGQL extends Apollo.Mutation<RemoveDocumentMutation, RemoveDocumentMutationVariables> {
    override document = RemoveDocumentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FamiliesDocument = gql`
    query Families {
  families {
    _id
    name
    notes
    owner
    createdAt
    updatedAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FamiliesGQL extends Apollo.Query<FamiliesQuery, FamiliesQueryVariables> {
    override document = FamiliesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FamilyDocument = gql`
    query Family($id: ID!) {
  family(id: $id) {
    _id
    name
    notes
    owner
    createdAt
    updatedAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FamilyGQL extends Apollo.Query<FamilyQuery, FamilyQueryVariables> {
    override document = FamilyDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateFamilyDocument = gql`
    mutation CreateFamily($input: CreateFamilyInput!) {
  createFamily(input: $input) {
    _id
    name
    notes
    createdAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateFamilyGQL extends Apollo.Mutation<CreateFamilyMutation, CreateFamilyMutationVariables> {
    override document = CreateFamilyDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateFamilyDocument = gql`
    mutation UpdateFamily($input: UpdateFamilyInput!) {
  updateFamily(input: $input) {
    _id
    name
    notes
    updatedAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateFamilyGQL extends Apollo.Mutation<UpdateFamilyMutation, UpdateFamilyMutationVariables> {
    override document = UpdateFamilyDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RemoveFamilyDocument = gql`
    mutation RemoveFamily($id: ID!) {
  removeFamily(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RemoveFamilyGQL extends Apollo.Mutation<RemoveFamilyMutation, RemoveFamilyMutationVariables> {
    override document = RemoveFamilyDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PersonsByFamilyDocument = gql`
    query PersonsByFamily($familyId: ID!) {
  personsByFamily(familyId: $familyId) {
    _id
    firstName
    lastName
    dateOfBirth
    placeOfBirth
    notes
    family
    parent
    createdAt
    updatedAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PersonsByFamilyGQL extends Apollo.Query<PersonsByFamilyQuery, PersonsByFamilyQueryVariables> {
    override document = PersonsByFamilyDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PersonDocument = gql`
    query Person($id: ID!) {
  person(id: $id) {
    _id
    firstName
    lastName
    dateOfBirth
    placeOfBirth
    notes
    family
    parent
    createdAt
    updatedAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PersonGQL extends Apollo.Query<PersonQuery, PersonQueryVariables> {
    override document = PersonDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreatePersonDocument = gql`
    mutation CreatePerson($input: CreatePersonInput!) {
  createPerson(input: $input) {
    _id
    firstName
    lastName
    dateOfBirth
    placeOfBirth
    notes
    family
    parent
    createdAt
    updatedAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreatePersonGQL extends Apollo.Mutation<CreatePersonMutation, CreatePersonMutationVariables> {
    override document = CreatePersonDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdatePersonDocument = gql`
    mutation UpdatePerson($input: UpdatePersonInput!) {
  updatePerson(input: $input) {
    _id
    firstName
    lastName
    dateOfBirth
    placeOfBirth
    notes
    family
    parent
    createdAt
    updatedAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdatePersonGQL extends Apollo.Mutation<UpdatePersonMutation, UpdatePersonMutationVariables> {
    override document = UpdatePersonDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RemovePersonDocument = gql`
    mutation RemovePerson($id: ID!) {
  removePerson(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RemovePersonGQL extends Apollo.Mutation<RemovePersonMutation, RemovePersonMutationVariables> {
    override document = RemovePersonDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }