export type Identity = {
  uid: string
  name: string
  avatar: string
  photo: string
  bio: string
  location: string
  interests: string[]
}

export type Profile = {
  uid: string
  name: string
  avatar: string
  photo: string
  bio: string
  location: string
  interests: string[]
}

export type Post = {
  id: string
  author_id: string
  author_name: string
  location: string
  when_text: string
  description: string
  tags: string[]
  created_at: string
}

export type Claim = {
  id: string
  post_id: string
  claimant_id: string
  claimant_name: string
  note: string
  created_at: string
}

export type ThreadMessage = {
  from: string
  text: string
  ts: number
}

export type Thread = {
  claim_id: string
  post_id: string
  participants: string[]
  messages: ThreadMessage[]
}

export type Filter = 'all' | 'mine' | 'claimed'
