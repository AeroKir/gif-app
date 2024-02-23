export interface GifObject {
  type: string
  id: string
  slug: string
  url: string
  title: string
  bitly_url: string
  embed_url: string
  username: string
  source: string
  rating: string
  alt_text: string
  source_tld: string
  source_post_url: string
  update_datetime: string
  create_datetime: string
  import_datetime: string
  trending_datetime: string
  images: {
    fixed_height: {
      url: string
      width: string
      height: string
      size: string
      mp4: string
      mp4_size: string
      webp: string
      webp_size: string
    }
    fixed_width: {
      url: string
      width: string
      height: string
      size: string
      mp4: string
      mp4_size: string
      webp: string
      webp_size: string
    }
    fixed_height_small: {
      url: string
      width: string
      height: string
      size: string
      mp4: string
      mp4_size: string
      webp: string
      webp_size: string
    }
    fixed_height_downsampled: {
      url: string
      width: string
      height: string
      size: string
      webp: string
      webp_size: string
    }
    fixed_width_small: {
      url: string
      width: string
      height: string
      size: string
      mp4: string
      mp4_size: string
      webp: string
      webp_size: string
    }
    downsized: {
      url: string
      width: string
      height: string
      size: string
    }
    original: {
      url: string
      width: string
      height: string
      size: string
      frames: string
      mp4: string
      mp4_size: string
      webp: string
      webp_size: string
    }
  }
  user: {
    avatar_url: string
    banner_url: string
    profile_url: string
    username: string
    display_name: string
  }
  analytics: {
    onload: {
      url: string
    }
    onclick: {
      url: string
    }
    onsent: {
      url: string
    }
  }
  meta: {
    msg: string
    status: number
    response_id: string
  }
  pagination: {
    offset: number
    total_count: number
    count: number
  }
}

export interface SelectedGifObject {
  type: string
  id: string
  title: string
  slug: string
  images: {
    original: {
      url: string
      width: string
      height: string
      size: string
      frames: string
      mp4: string
      mp4_size: string
      webp: string
      webp_size: string
    }
  }
  user: {
    avatar_url: string
    banner_url: string
    profile_url: string
    username: string
    display_name: string
  }
}

export interface GifNotFoundObject {
  type: string
  id: string
  title: string
  slug: string
  images: {
    original: {
      url: string
      width: string
      height: string
      size: string
      frames: string
      mp4: string
      mp4_size: string
      webp: string
      webp_size: string
    }
  }
}
