module Cms
  class SitemapSweeper < ActionController::Caching::Sweeper
    observe Cms::Section
    observe Cms::Page
    
    # If our sweeper detects that a Product was created call this
    def after_create( node )
      expire_cache_for( node.path )
    end
   
    # If our sweeper detects that a Product was updated call this
    def after_update( node )
      expire_cache_for( node.path )
    end
    
    # If our sweeper detects that a Product was deleted call this
    def after_destroy( node )
      expire_cache_for( node.path )
    end
   
    private
    def expire_cache_for( path )
      # Expire a fragment
      path_bits = path.split( '/' )
      path_bits.shift

      # the first / in the path is special, denoting the root
      # so we have to expire it manually
      expire_fragment( "cache_fragment_sitemap_/" )

      # loop through the array of path segments,
      # accumulating a running path 
      # and clear the cache for it
      path_bits.inject( '' ) { |path_accm, path_bit|
        path_accm += "/#{path_bit}"
        expire_fragment( "cache_fragment_sitemap_#{path_accm}" )
        path_accm
      }
    end
  end
end